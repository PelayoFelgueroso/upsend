import { verifyKeys } from "@/emails/lib/verifyKeys";
import { EmailService } from "@/emails/services/email.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const EmailSchema = z.object({
  to: z.string().email(),
  templateId: z.string(),
  variables: z.record(z.any()).optional(),
});

const allowedMethods = ["POST", "OPTIONS"];
const allowedHeaders = "Content-Type, x-api-key, x-secret-key";

function setCorsHeaders(res: NextResponse, origin: string) {
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", allowedMethods.join(", "));
  res.headers.set("Access-Control-Allow-Headers", allowedHeaders);
  return res;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "*";
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, origin);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") || "*";
  try {
    const headers = req.headers;
    const secretKey = headers.get("x-secret-key") || "";
    const apiKey = headers.get("x-api-key") || "";

    if (!apiKey || !secretKey) {
      const res = NextResponse.json(
        { error: "API key & secret key are required" },
        { status: 401 }
      );
      return setCorsHeaders(res, origin);
    }

    const client = await verifyKeys(apiKey, secretKey);
    if (!client) {
      const res = NextResponse.json(
        { error: "Invalid credentials" },
        { status: 403 }
      );
      console.log("falooooo")
      return setCorsHeaders(res, origin);
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch (error) {
      const res = NextResponse.json({ error }, { status: 400 });
      return setCorsHeaders(res, origin);
    }

    const parseResult = EmailSchema.safeParse(body);
    if (!parseResult.success) {
      const res = NextResponse.json(
        {
          error: "Invalid data",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
      return setCorsHeaders(res, origin);
    }

    const { to, templateId, variables } = parseResult.data;

    const result = await EmailService.sendTemplateEmail(
      client.id,
      templateId,
      to,
      variables
    );

    const res = NextResponse.json({
      success: true,
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
    });
    return setCorsHeaders(res, origin);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const res = NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
      return setCorsHeaders(res, origin);
    }

    console.error("Error sending email:", error);
    const res = NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
    return setCorsHeaders(res, origin);
  }
}
