import { db } from "@/lib/db";
import { hashPassword } from "@/auth/lib/hash";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, country, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user with default values
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        country,
        password: hashed,
        usage: {
          create: {
            emailsSent: 0,
            apiCalls: 0,
            storageUsed: 0,
            limits: {
              emailsPerMonth: 1000, // Free plan limits
              apiCallsPerMonth: 5000,
              storageGB: 1,
            },
          },
        },
      },
      include: {
        usage: true,
      },
    });

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "User created successfully",
      user: {
        ...userWithoutPassword,
        usage: {
          ...userWithoutPassword.usage,
          storageUsed: userWithoutPassword.usage?.storageUsed.toString(),
        },
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
