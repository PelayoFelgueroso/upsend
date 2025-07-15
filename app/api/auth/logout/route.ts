import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

export async function POST(request: NextRequest) {
  try {
    // Get user from access token
    const authHeader = request.headers.get("authorization");
    let userId: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.substring(7);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userId = decoded.userId;
      } catch {
        // Token might be expired, continue with logout
      }
    }

    // Get refresh token from cookie
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Remove refresh token from database
    if (refreshToken) {
      await db.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    // Remove all refresh tokens for this user (logout from all devices)
    if (userId) {
      await db.refreshToken.deleteMany({
        where: { userId },
      });
    }

    // Clear refresh token cookie
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
