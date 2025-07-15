import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth } from "@/auth/middlewares/authmiddleware";
import { formatDate } from "@/lib/utils";

export const GET = withAuth(async (req) => {
  try {
    const userId = req.user!.id;
    const url = new URL(req.url);
    const period = url.searchParams.get("period") || "6months";

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "7days":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30days":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "6months":
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
    }

    if (period === "7days") {
      // Crear lista de últimos 7 días
      const days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(now);
        date.setDate(now.getDate() - (6 - i));
        return date;
      });

      // Query por día
      const emailsByDay = await db.$queryRaw<
        Array<{ date: string; total: number }>
      >`
    SELECT 
      TO_CHAR("sentAt", 'YYYY-MM-DD') as date,
      COUNT(*)::int as total
    FROM "email_logs"
    WHERE "userId" = ${userId}
      AND "sentAt" >= ${startDate}
    GROUP BY date
    ORDER BY date
  `;

      // Mapear a objeto para fácil acceso
      const countByDate = Object.fromEntries(
        emailsByDay.map((d) => [d.date, d.total])
      );

      // Formatear `chartData`
      const chartData = days.map((day) => {
        const iso = day.toISOString().slice(0, 10);

        return {
          name: formatDate(day),
          total: countByDate[iso] || 0,
        };
      });

      return NextResponse.json({
        analytics: {
          chartData,
          period,
          totalEmails: chartData.reduce((sum, item) => sum + item.total, 0),
        },
      });
    }

    // Get email counts grouped by month
    const emailsByMonth = await db.$queryRaw<
      Array<{ month: string; total: number }>
    >`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', "sentAt"), 'Mon') as month,
        COUNT(*)::int as total
      FROM "email_logs"
      WHERE "userId" = ${userId}
        AND "sentAt" >= ${startDate}
      GROUP BY DATE_TRUNC('month', "sentAt")
      ORDER BY DATE_TRUNC('month', "sentAt")
    `;

    // Format data for charts
    const chartData = emailsByMonth.map((item) => ({
      name: item.month,
      total: item.total,
    }));

    return NextResponse.json({
      analytics: {
        chartData,
        period,
        totalEmails: chartData.reduce((sum, item) => sum + item.total, 0),
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard analytics" },
      { status: 500 }
    );
  }
});
