import { withAuth } from "@/auth/middlewares/authmiddleware";
import { EmailService } from "@/emails/services/email.service";
import { NextResponse } from "next/server";
import { z } from "zod";

const sendTestSchema = z.object({
  testEmail: z.string().email("Invalid email format"),
});

export const POST = withAuth(async (request) => {
  try {
    const user = request.user!;
    const body = await request.json();
    const { testEmail } = sendTestSchema.parse(body);

    await EmailService.sendTestEmail(user.id, testEmail);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error sending test email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
});
