import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  AuthenticatedRequest,
  withAuth,
} from "@/auth/middlewares/authmiddleware";

const updateTemplateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  subject: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  type: z.enum(["TRANSACTIONAL", "MARKETING", "NOTIFICATION"]).optional(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]).optional(),
});

export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const userId = req.user!.id;
    const url = new URL(req.url);
    const templateId = url.pathname.split("/").pop();

    const template = await db.emailTemplate.findFirst({
      where: {
        id: templateId,
        userId,
      },
      include: {
        _count: {
          select: { emailLogs: true },
        },
      },
    });

    if (!template) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    const formattedTemplate = {
      id: template.id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      type: template.type,
      status: template.status,
      usage: template._count.emailLogs,
      createdAt: template.createdAt.toISOString(),
      updatedAt: template.updatedAt.toISOString(),
    };

    return NextResponse.json(formattedTemplate);
  } catch (error) {
    console.error("Template GET error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const PATCH = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const data = updateTemplateSchema.parse(body);
    const userId = req.user!.id;
    const url = new URL(req.url);
    const templateId = url.pathname.split("/").pop();

    // Check if template exists and belongs to user
    const existingTemplate = await db.emailTemplate.findFirst({
      where: {
        id: templateId,
        userId,
      },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    // Check for duplicate name if name is being updated
    if (data.name && data.name !== existingTemplate.name) {
      const duplicateTemplate = await db.emailTemplate.findFirst({
        where: {
          userId,
          name: data.name,
          id: { not: templateId },
        },
      });

      if (duplicateTemplate) {
        return NextResponse.json(
          { message: "A template with this name already exists" },
          { status: 409 }
        );
      }
    }

    // Update template
    const template = await db.emailTemplate.update({
      where: { id: templateId },
      data: {
        ...data,
        type: data.type as any,
        status: data.status as any,
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

    return NextResponse.json(formattedTemplate);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Template update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const userId = req.user!.id;
    const url = new URL(req.url);
    const templateId = url.pathname.split("/").pop();

    // Check if template exists and belongs to user
    const template = await db.emailTemplate.findFirst({
      where: {
        id: templateId,
        userId,
      },
      include: {
        _count: {
          select: { emailLogs: true },
        },
      },
    });

    if (!template) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404 }
      );
    }

    // Check if template is being used
    if (template._count.emailLogs > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete template that has been used. Archive it instead.",
          canArchive: true,
        },
        { status: 409 }
      );
    }

    // Delete template
    await db.emailTemplate.delete({
      where: { id: templateId },
    });

    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Template deletion error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
