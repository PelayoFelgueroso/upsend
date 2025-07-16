import { db } from "@/lib/db";
import crypto from "crypto";

export function generateApiKey() {
  return crypto.randomBytes(32).toString("hex"); // 64 caracteres
}

interface Client {
  id: string;
  name: string;
  email: string;
  role: string;
  apiKeyId: string;
  apiKeyName: string;
}

export async function verifyKeys(
  apiKey: string,
  secretKey: string
): Promise<Client | null> {
  try {
    const apiKeyRecord = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        status: "ACTIVE",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            emailVerified: true,
          },
        },
      },
    });

    console.log(apiKeyRecord.key, secretKey)

    if (!apiKeyRecord || apiKeyRecord.userId !== secretKey) {
      return null;
    }

    // Update lastUsed
    await db.apiKey.update({
      where: { id: apiKeyRecord.id },
      data: { lastUsed: new Date() },
    });

    return {
      id: apiKeyRecord.user.id,
      name: apiKeyRecord.user.name,
      email: apiKeyRecord.user.email,
      role: apiKeyRecord.user.role,
      apiKeyId: apiKeyRecord.id,
      apiKeyName: apiKeyRecord.name,
    };
  } catch (error) {
    console.error("Error verifying keys:", error);
    return null;
  }
}
