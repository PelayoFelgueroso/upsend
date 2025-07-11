import { verifyKeys } from "@/emails/lib/verifyKeys";
import { EmailService } from "@/emails/services/email.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const EmailSchema = z.object({
  to: z.string().email(),
  templateId: z.string(),
  variables: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const headers = req.headers;
    const secretKey = headers.get("x-secret-key") || "";
    const apiKey = headers.get("x-api-key") || "";

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { error: "API key & secret key are required" },
        { status: 401 }
      );
    }

    const client = await verifyKeys(apiKey, secretKey);
    if (!client) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 403 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const parseResult = EmailSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { to, templateId, variables } = parseResult.data;

    const result = await EmailService.sendTemplateEmail(
      client.id,
      templateId,
      to,
      variables
    );

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
