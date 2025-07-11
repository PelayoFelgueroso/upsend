import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Solo cambio esta función para aceptar el contexto como segundo parámetro
export function withAuth<TContext = any>(
  handler: (req: AuthenticatedRequest, context: TContext) => Promise<Response>
) {
  return async (request: NextRequest, context: TContext) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;

      if (!token) {
        return new Response(
          JSON.stringify({ message: "Access token required" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      // Ahora pasamos ambos parámetros al handler
      return handler(authenticatedRequest, context);
    } catch {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
}

// También actualizo esta función para mantener consistencia
export function withRoleAuth<TContext = any>(
  requiredRole: string,
  handler: (req: AuthenticatedRequest, context: TContext) => Promise<Response>
) {
  return withAuth(async (request: AuthenticatedRequest, context: TContext) => {
    const userRole = request.user?.role;
    const roleHierarchy = { viewer: 1, user: 2, admin: 3 };
    const userLevel =
      roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel =
      roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    if (userLevel < requiredLevel) {
      return new Response(
        JSON.stringify({ message: "Insufficient permissions" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return handler(request, context);
  });
}
