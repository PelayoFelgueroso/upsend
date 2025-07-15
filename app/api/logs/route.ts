import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

const querySchema = z.object({
  search: z.string().optional(),
  status: z
    .enum(["SENT", "DELIVERED", "OPENED", "CLICKED", "BOUNCED", "FAILED"])
    .optional(),
  templateId: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse(Object.fromEntries(searchParams));

    const userId = req.user!.id;
    const offset = (query.page - 1) * query.limit;

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      template: {
        userId,
      },
    };

    if (query.search) {
      where.OR = [
        { recipient: { contains: query.search, mode: "insensitive" } },
        { subject: { contains: query.search, mode: "insensitive" } },
        { template: { name: { contains: query.search, mode: "insensitive" } } },
      ];
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.templateId) {
      where.templateId = query.templateId;
    }

    if (query.startDate || query.endDate) {
      where.sentAt = {};
      if (query.startDate) {
        where.sentAt.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.sentAt.lte = new Date(query.endDate);
      }
    }

    // Get logs with template info
    const [logs, total] = await Promise.all([
      db.emailLog.findMany({
        where,
        include: {
          template: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { sentAt: "desc" },
        skip: offset,
        take: query.limit,
      }),
      db.emailLog.count({ where }),
    ]);

    // Format response
    const formattedLogs = logs.map((log) => ({
      id: log.id,
      templateName: log.template?.name,
      recipient: log.recipient,
      subject: log.subject,
      status: log.status.toLowerCase(),
      content: log.content,
      sentAt: log.sentAt.toISOString(),
      error: log.error,
    }));

    const pagination = {
      page: query.page,
      limit: query.limit,
      total,
      pages: Math.ceil(total / query.limit),
    };

    return NextResponse.json({
      logs: formattedLogs,
      pagination,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid query parameters", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Logs GET error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
