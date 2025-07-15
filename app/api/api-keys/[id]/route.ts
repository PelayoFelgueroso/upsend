import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";

export const DELETE = withAuth(
  async (request, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id: keyId } = await params;
      const userId = request.user!.id;

      // Check if API key exists and belongs to user
      const apiKey = await db.apiKey.findFirst({
        where: {
          id: keyId,
          userId,
        },
      });

      if (!apiKey) {
        return NextResponse.json(
          { message: "API key not found" },
          { status: 404 }
        );
      }

      // Soft delete by setting status to INACTIVE
      await db.apiKey.update({
        where: { id: keyId },
        data: {
          status: "INACTIVE",
          revokedAt: new Date(),
        },
      });

      return NextResponse.json({ message: "API key revoked successfully" });
    } catch (error) {
      console.error("API Key revocation error:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
