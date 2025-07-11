import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateApiKey } from "@/lib/api-key";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Solo proteger ciertas rutas
  if (!path.startsWith("/api/send-email")) return NextResponse.next();

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey)
    return NextResponse.json({ error: "API Key requerida" }, { status: 401 });

  const valid = await validateApiKey(apiKey);
  if (!valid)
    return NextResponse.json({ error: "API Key inválida" }, { status: 403 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/send-email"],
};
