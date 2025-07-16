import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/auth/middlewares/authmiddleware";
import { hashPassword } from "@/auth/lib/hash";

const smtpConfigSchema = z.object({
  host: z.string().min(1, "Host is required"),
  port: z.number().min(1).max(65535),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  fromEmail: z.string().email("Invalid email format"),
  fromName: z.string().min(1, "From name is required"),
  replyToEmail: z.string().email("Invalid email format").optional(),
});

export const GET = withAuth(async (req) => {
  try {
    const user = req.user!;

    const config = await prisma.smtpConfig.findFirst({
      where: { userId: user.id, isActive: true },
    });

    if (!config) {
      return NextResponse.json(config);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...configWithoutPassword } = config;

    return NextResponse.json(configWithoutPassword);
  } catch (error) {
    console.error("Error fetching SMTP config:", error);
    return NextResponse.json(
      { error: "Failed to fetch SMTP configuration" },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req) => {
  try {
    const user = req.user!;

    const body = await req.json();
    const validatedData = smtpConfigSchema.parse(body);
    const { password, ...rest } = validatedData;

    // Hash password
    const hashed = await hashPassword(password);

    // Create new config
    const config = await prisma.smtpConfig.create({
      data: {
        ...rest,
        password: hashed,
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "SMTP configuration saved successfully",
      config,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error saving SMTP config:", error);
    return NextResponse.json(
      { error: "Failed to save SMTP configuration" },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req) => {
  try {
    const user = req.user!;

    await prisma.smtpConfig.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });

    return NextResponse.json({
      message: "SMTP configuration deactivated successfully",
    });
  } catch (error) {
    console.error("Error deactivating SMTP config:", error);
    return NextResponse.json(
      { error: "Failed to deactivate SMTP configuration" },
      { status: 500 }
    );
  }
});
