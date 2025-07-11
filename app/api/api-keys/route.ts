import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import crypto from "crypto";
import { withAuth } from "@/auth/middlewares/authmiddleware";

const createApiKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
});

function generateApiKey(): string {
  const prefix = "sk_";
  const environment = process.env.NODE_ENV === "production" ? "live_" : "test_";
  const randomBytes = crypto.randomBytes(32).toString("hex");
  return `${prefix}${environment}${randomBytes}`;
}

function maskApiKey(key: string): string {
  if (key.length <= 12) return key;
  return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
}

export const GET = withAuth(async (req) => {
  try {
    const userId = req.user!.id;

    const apiKeys = await db.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const formattedKeys = apiKeys.map((key) => ({
      id: key.id,
      name: key.name,
      key: maskApiKey(key.key), // Always mask in list view
      status: key.status.toLowerCase(),
      createdAt: key.createdAt.toISOString(),
      lastUsed: key.lastUsed?.toISOString() || null,
    }));

    return NextResponse.json({apiKeys: formattedKeys}, { status: 200 });
  } catch (error) {
    console.error("API Keys GET error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req) => {
  try {
    const body = await req.json();
    const data = createApiKeySchema.parse(body);
    const userId = req.user!.id;

    // Check for duplicate name
    const existingKey = await db.apiKey.findFirst({
      where: {
        userId,
        name: data.name,
      },
    });

    if (existingKey) {
      return NextResponse.json(
        { message: "An API key with this name already exists" },
        { status: 409 }
      );
    }

    // Generate unique API key
    let apiKey: string;
    let isUnique = false;
    let attempts = 0;

    do {
      apiKey = generateApiKey();
      const existing = await db.apiKey.findFirst({
        where: { key: apiKey },
      });
      isUnique = !existing;
      attempts++;
    } while (!isUnique && attempts < 5);

    if (!isUnique) {
      return NextResponse.json(
        { message: "Failed to generate unique API key. Please try again." },
        { status: 500 }
      );
    }

    // Create API key
    const newApiKey = await db.apiKey.create({
      data: {
        name: data.name,
        key: apiKey!,
        userId,
        status: "ACTIVE",
      },
    });

    // Return full key only on creation
    return NextResponse.json(
      {
        id: newApiKey.id,
        name: newApiKey.name,
        key: newApiKey.key, // Full key returned only once
        status: newApiKey.status.toLowerCase(),
        createdAt: newApiKey.createdAt.toISOString(),
        lastUsed: null,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("API Key creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
});
