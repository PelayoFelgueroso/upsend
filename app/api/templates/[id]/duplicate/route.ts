import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

export const POST = withAuth(
  async (req, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const userId = req.user!.id;
      const { id: templateId } = await params;

      // Find original template
      const originalTemplate = await db.emailTemplate.findFirst({
        where: {
          id: templateId,
          userId,
        },
      });

      if (!originalTemplate) {
        return NextResponse.json(
          { message: "Template not found" },
          { status: 404 }
        );
      }

      // Generate unique name
      let duplicateName = `${originalTemplate.name} (Copy)`;
      let counter = 1;

      while (
        await db.emailTemplate.findFirst({
          where: { userId, name: duplicateName },
        })
      ) {
        duplicateName = `${originalTemplate.name} (Copy ${counter})`;
        counter++;
      }

      // Create duplicate
      const duplicateTemplate = await db.emailTemplate.create({
        data: {
          name: duplicateName,
          subject: originalTemplate.subject,
          content: originalTemplate.content,
          type: originalTemplate.type,
          status: "DRAFT", // Always create as draft
          userId,
        },
        include: {
          _count: {
            select: { emailLogs: true },
          },
        },
      });

      const formattedTemplate = {
        id: duplicateTemplate.id,
        name: duplicateTemplate.name,
        subject: duplicateTemplate.subject,
        content: duplicateTemplate.content,
        type: duplicateTemplate.type.toLowerCase(),
        status: duplicateTemplate.status.toLowerCase(),
        usage: duplicateTemplate._count.emailLogs,
        createdAt: duplicateTemplate.createdAt.toISOString(),
        updatedAt: duplicateTemplate.updatedAt.toISOString(),
      };

      return NextResponse.json(formattedTemplate, { status: 201 });
    } catch (error) {
      console.error("Template duplication error:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
