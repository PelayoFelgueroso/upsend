import {
  type AuthenticatedRequest,
  withAuth,
} from "@/auth/middlewares/authmiddleware";
import { EmailService } from "@/emails/services/email.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = withAuth(
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const user = request.user!;
      const { id } = await params;

      await EmailService.sendTemplateEmail(user.id, id, user.email);

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
  }
);
