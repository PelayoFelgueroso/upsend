import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

const exportSchema = z.object({
  format: z.enum(["csv", "json"]),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  includeContent: z.boolean().default(false),
  status: z
    .enum(["SENT", "DELIVERED", "OPENED", "CLICKED", "BOUNCED", "FAILED"])
    .optional(),
});

function formatCsvRow(values: (string | number | null)[]): string {
  return values
    .map((value) => {
      if (value === null || value === undefined) return "";
      const str = String(value);
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    })
    .join(",");
}

export const POST = withAuth(async (req) => {
  try {
    const body = await req.json();
    const data = exportSchema.parse(body);
    const userId = req.user!.id;

    // Build where clause
    const where: any = {
      template: {
        userId,
      },
    };

    if (data.status) {
      where.status = data.status;
    }

    if (data.startDate || data.endDate) {
      where.sentAt = {};
      if (data.startDate) {
        where.sentAt.gte = new Date(data.startDate);
      }
      if (data.endDate) {
        where.sentAt.lte = new Date(data.endDate);
      }
    }

    // Get logs
    const logs = await db.emailLog.findMany({
      where,
      include: {
        template: {
          select: {
            name: true,
            content: data.includeContent,
          },
        },
      },
      orderBy: { sentAt: "desc" },
      take: 10000, // Limit to prevent memory issues
    });

    const timestamp = new Date().toISOString().split("T")[0];

    if (data.format === "csv") {
      // CSV Export
      const headers = [
        "ID",
        "Template",
        "Recipient",
        "Subject",
        "Status",
        "Message ID",
        "Sent At",
        "Delivered At",
        "Opened At",
        "Clicked At",
        "Error Message",
      ];

      if (data.includeContent) {
        headers.push("Content");
      }

      const csvRows = [
        headers.join(","),
        ...logs.map((log) =>
          formatCsvRow([
            log.id,
            log.template.name,
            log.recipient,
            log.subject,
            log.status,
            log.messageId || "",
            log.sentAt.toISOString(),
            log.deliveredAt?.toISOString() || "",
            log.openedAt?.toISOString() || "",
            log.clickedAt?.toISOString() || "",
            log.errorMessage || "",
            ...(data.includeContent ? [log.template.content || ""] : []),
          ])
        ),
      ];

      const csvContent = csvRows.join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="email-logs-${timestamp}.csv"`,
        },
      });
    } else {
      // JSON Export
      const jsonData = {
        exportedAt: new Date().toISOString(),
        totalRecords: logs.length,
        filters: {
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
          includeContent: data.includeContent,
        },
        logs: logs.map((log) => ({
          id: log.id,
          templateName: log.template.name,
          recipient: log.recipient,
          subject: log.subject,
          status: log.status,
          messageId: log.messageId,
          sentAt: log.sentAt.toISOString(),
          deliveredAt: log.deliveredAt?.toISOString() || null,
          openedAt: log.openedAt?.toISOString() || null,
          clickedAt: log.clickedAt?.toISOString() || null,
          errorMessage: log.errorMessage,
          ...(data.includeContent && { content: log.template.content }),
        })),
      };

      return new NextResponse(JSON.stringify(jsonData, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="email-logs-${timestamp}.json"`,
        },
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Export error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
