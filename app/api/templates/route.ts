import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

const createTemplateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject too long"),
  content: z.string().min(10, "Content is required"),
  type: z.enum(["TRANSACTIONAL", "MARKETING", "NOTIFICATION"]),
});

const querySchema = z.object({
  search: z.string().optional(),
  type: z.enum(["TRANSACTIONAL", "MARKETING", "NOTIFICATION"]).optional(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
});

export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse(Object.fromEntries(searchParams));

    const userId = req.user!.id;
    const offset = (query.page - 1) * query.limit;

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { userId };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { subject: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.status) {
      where.status = query.status;
    }

    // Get templates with usage count
    const [templates, total] = await Promise.all([
      db.emailTemplate.findMany({
        where,
        include: {
          _count: {
            select: { emailLogs: true },
          },
        },
        orderBy: { updatedAt: "desc" },
        skip: offset,
        take: query.limit,
      }),
      db.emailTemplate.count({ where }),
    ]);

    // Format response
    const formattedTemplates = templates.map((template) => ({
      id: template.id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      type: template.type.toLowerCase(),
      status: template.status.toLowerCase(),
      usage: template._count.emailLogs,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    }));

    const pagination = {
      page: query.page,
      limit: query.limit,
      total,
      pages: Math.ceil(total / query.limit),
    };

    return NextResponse.json({
      templates: formattedTemplates,
      pagination,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid query parameters", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Templates GET error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req) => {
  try {
    const body = await req.json();
    const data = createTemplateSchema.parse(body);
    const userId = req.user!.id;

    // Check for duplicate name
    const existingTemplate = await db.emailTemplate.findFirst({
      where: {
        userId,
        name: data.name,
      },
    });

    if (existingTemplate) {
      return NextResponse.json(
        { message: "A template with this name already exists" },
        { status: 409 }
      );
    }

    // Create template
    const template = await db.emailTemplate.create({
      data: {
        ...data,
        userId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: data.type as any,
      },
      include: {
        _count: {
          select: { emailLogs: true },
        },
      },
    });

    const formattedTemplate = {
      id: template.id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      type: template.type.toLowerCase(),
      status: template.status.toLowerCase(),
      usage: template._count.emailLogs,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    };

    return NextResponse.json(formattedTemplate, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Template creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
