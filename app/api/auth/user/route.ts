import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  AuthenticatedRequest,
  withAuth,
} from "@/auth/middlewares/authmiddleware";

// GET /api/auth/user - Get current user
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: { usage: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, usage, ...rest } = user;

    const safeUser = {
      ...rest,
      usage: usage
        ? {
            ...usage,
            storageUsed: usage.storageUsed.toString(),
          }
        : null,
    };

    return NextResponse.json({
      user: {
        ...safeUser,
        usage: {
          ...safeUser.usage,
          storageUsed: safeUser.usage?.storageUsed.toString(),
        },
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});

// PATCH /api/auth/user - Update user profile
export const PATCH = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: { usage: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, company, phone } = body;

    // Validate input
    if (name && (typeof name !== "string" || name.trim().length < 2)) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    // Update user in database
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name: name.trim() }),
        ...(company !== undefined && { company: company?.trim() || null }),
        ...(phone !== undefined && { phone: phone?.trim() || null }),
        updatedAt: new Date(),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
