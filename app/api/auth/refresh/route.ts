import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const REUSE_WINDOW_MS = 5000;

function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId, type: "access" }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { userId, type: "refresh" },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
}

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Get refresh token from body or cookie
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not provided" },
        { status: 401 }
      );
    }

    // Verify refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch {
      // Clear invalid cookie
      cookieStore.delete("refreshToken");
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Check if refresh token exists in database and is not expired
    const storedToken = await db.refreshToken.findFirst({
      where: {
        token: refreshToken,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (!storedToken) {
      // Clean up expired tokens
      await db.refreshToken.deleteMany({
        where: {
          userId: decoded.userId,
          expiresAt: { lte: new Date() },
        },
      });

      cookieStore.delete("accesToken");
      cookieStore.delete("refreshToken");
      return NextResponse.json(
        { message: "Refresh token not found or expired" },
        { status: 401 }
      );
    }

    const now = new Date();
    if (storedToken.used) {
      const delta = now.getTime() - (storedToken.usedAt?.getTime() ?? 0);

      if (delta < REUSE_WINDOW_MS) {
        const user = await db.user.findUnique({
          where: { id: storedToken.userId },
        });
        if (!user)
          return NextResponse.json(
            { message: "User not found" },
            { status: 401 }
          );

        const { accessToken } = generateTokens(user.id);

        const res = NextResponse.json({
          user: { ...user, password: undefined },
        });
        res.cookies.set("accessToken", accessToken, {
          httpOnly: true,
          path: "/",
          maxAge: 15 * 60,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        return res;
      }

      return NextResponse.json(
        { message: "Token already used" },
        { status: 401 }
      );
    }

    // Find user with all relations
    const user = await db.user.findUnique({
      where: { id: storedToken.userId },
    });

    if (!user) {
      // Clean up orphaned tokens
      await db.refreshToken.deleteMany({
        where: { userId: storedToken.userId },
      });

      cookieStore.delete("refreshToken");
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id
    );

    // Atomic token rotation: remove old, create new
    await db.$transaction([
      db.refreshToken.update({
        where: { token: refreshToken },
        data: { used: true, usedAt: now },
      }),
      db.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      }),
    ]);

    // Set new tokens as httpOnly cookie
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Return user data and access token
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Token refresh error:", error);

    // Clear potentially corrupted cookies
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    response.cookies.delete("refreshToken");

    return response;
  }
}
