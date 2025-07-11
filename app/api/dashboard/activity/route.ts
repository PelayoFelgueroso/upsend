import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

export const GET = withAuth(async (req) => {
  try {
    const userId = req.user!.id;
    const url = new URL(req.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "10");

    // Get recent email activity
    const recentActivity = await db.emailLog.findMany({
      where: {
        userId,
      },
      include: {
        template: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        sentAt: "desc",
      },
      take: limit,
    });

    const formattedActivity = recentActivity.map((log) => ({
      id: log.id,
      template: log.template?.name || "Unknown Template",
      recipient: log.recipient,
      subject: log.subject,
      status: log.status.toLowerCase(),
      sentAt: log.sentAt,
      content: log.content,
    }));

    return NextResponse.json({ activity: formattedActivity });
  } catch (error) {
    console.error("Dashboard activity error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard activity" },
      { status: 500 }
    );
  }
});
