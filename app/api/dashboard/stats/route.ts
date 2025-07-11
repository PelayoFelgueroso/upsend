import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { withAuth } from "@/auth/middlewares/authmiddleware"

export const GET = withAuth(async (req) => {
  try {
    const userId = req.user!.id

    // Get current month date range
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get email stats for current month
    const currentMonthEmails = await db.emailLog.count({
      where: {
        userId,
        sentAt: {
          gte: startOfMonth,
        },
      },
    })

    // Get email stats for last month
    const lastMonthEmails = await db.emailLog.count({
      where: {
        userId,
        sentAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    })

    // Get sent emails count
    const sentEmails = await db.emailLog.count({
      where: {
        userId,
        status: "SENT",
        sentAt: {
          gte: startOfMonth,
        },
      },
    })

    // Get active templates count
    const activeTemplates = await db.emailTemplate.count({
      where: {
        userId,
        status: "ACTIVE",
      },
    })

    // Calculate success rate
    const totalEmailsThisMonth = await db.emailLog.count({
      where: {
        userId,
        sentAt: {
          gte: startOfMonth,
        },
      },
    })

    const successfulEmails = await db.emailLog.count({
      where: {
        userId,
        status: {
          in: ["SENT", "DELIVERED", "OPENED"],
        },
        sentAt: {
          gte: startOfMonth,
        },
      },
    })

    const successRate = totalEmailsThisMonth > 0 ? Math.round((successfulEmails / totalEmailsThisMonth) * 100) : 0

    // Calculate growth percentages
    const emailGrowth =
      lastMonthEmails > 0
        ? Math.round(((currentMonthEmails - lastMonthEmails) / lastMonthEmails) * 100)
        : currentMonthEmails > 0
          ? 100
          : 0

    const stats = {
      totalEmails: {
        value: currentMonthEmails,
        growth: emailGrowth,
        trend: emailGrowth >= 0 ? "up" : "down",
      },
      emailsSent: {
        value: sentEmails,
        growth: Math.round((sentEmails / (currentMonthEmails || 1)) * 100),
        trend: "up",
      },
      activeTemplates: {
        value: activeTemplates,
        growth: 0, // Could calculate template growth if needed
        trend: "neutral",
      },
      successRate: {
        value: successRate,
        growth: 0, // Could calculate success rate trend
        trend: successRate >= 95 ? "up" : successRate >= 85 ? "neutral" : "down",
      },
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ message: "Failed to fetch dashboard stats" }, { status: 500 })
  }
})
