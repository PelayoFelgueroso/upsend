import { withAuth } from "@/auth/middlewares/authmiddleware";
import { EmailService } from "@/emails/services/email.service";
import { NextResponse } from "next/server";
import { z } from "zod";

const testSmtpSchema = z.object({
  host: z.string().min(1, "Host is required"),
  port: z.number().min(1).max(65535),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const POST = withAuth(async (request) => {
  try {
    const body = await request.json();
    const validatedData = testSmtpSchema.parse(body);

    const result = await EmailService.testSmtpConnection(validatedData);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error testing SMTP connection:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to test SMTP connection",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
});
