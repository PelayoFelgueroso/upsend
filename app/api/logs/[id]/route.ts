import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

// GET /api/logs/[id] - Get specific log details
export const GET = withAuth(async (req, { params }) => {
  try {
    const userId = req.user!.id;
    const logId = params.id;

    const log = await db.emailLog.findFirst({
      where: {
        id: logId,
        userId,
      },
      include: {
        template: {
          select: {
            name: true,
            subject: true,
          },
        },
      },
    });

    if (!log) {
      return NextResponse.json({ message: "Log not found" }, { status: 404 });
    }

    const formattedLog = {
      id: log.id,
      templateName: log.template?.name || "Unknown Template",
      templateId: log.templateId,
      recipient: log.recipient,
      subject: log.subject,
      status: log.status.toLowerCase(),
      content: log.content,
      error: log.error,
      sentAt: log.sentAt,
      // Add more detailed fields if available in your schema
      deliveredAt: null, // Add these fields to your schema if needed
      openedAt: null,
      clickedAt: null,
      retryCount: 0,
    };

    return NextResponse.json({ log: formattedLog });
  } catch (error) {
    console.error("Get log error:", error);
    return NextResponse.json(
      { message: "Failed to fetch log" },
      { status: 500 }
    );
  }
});
