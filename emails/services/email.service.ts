import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import {
  EmailOptions,
  SmtpConfigTest,
  TestConnectionResult,
} from "../models/email";

export class EmailService {
  static async getSmtpConfig(userId: string) {
    const config = await prisma.smtpConfig.findFirst({
      where: {
        userId,
        isActive: true,
      },
    });

    if (!config) {
      throw new Error("No active SMTP configuration found");
    }

    return config;
  }

  static async createTransporter(userId: string) {
    const config = await this.getSmtpConfig(userId);

    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.username,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  static async testSmtpConnection(
    smtpConfig: SmtpConfigTest
  ): Promise<TestConnectionResult> {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.port === 465,
        auth: {
          user: smtpConfig.username,
          pass: smtpConfig.password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.verify();

      return {
        success: true,
        message: "SMTP connection successful",
      };
    } catch (error) {
      console.error("SMTP connection test failed:", error);
      return {
        success: false,
        message: "SMTP connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static async sendEmail(userId: string, options: EmailOptions) {
    try {
      const config = await this.getSmtpConfig(userId);
      const transporter = await this.createTransporter(userId);

      // Create email log entry
      const emailLog = await prisma.emailLog.create({
        data: {
          recipient: options.recipient,
          subject: options.subject,
          content: options.html,
          status: "SENT",
          templateId: options.templateId,
          userId,
        },
      });

      try {
        const info = await transporter.sendMail({
          from: `"${config.fromName}" <${config.fromEmail}>`,
          to: options.recipient,
          subject: options.subject,
          html: options.html,
          replyTo: config.replyToEmail || config.fromEmail,
        });

        // Update log as sent
        await prisma.emailLog.update({
          where: { id: emailLog.id },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        });

        return {
          success: true,
          messageId: info.messageId,
          logId: emailLog.id,
        };
      } catch (sendError) {
        // Update log as failed
        await prisma.emailLog.update({
          where: { id: emailLog.id },
          data: {
            status: "FAILED",
            error:
              sendError instanceof Error ? sendError.message : "Unknown error",
          },
        });

        throw sendError;
      }
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error(
        `Failed to send email: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async sendTestEmail(userId: string, testEmail: string) {
    const config = await this.getSmtpConfig(userId);

    const testHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Test Email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { padding: 20px 0; }
            .footer { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 SMTP Configuration Test</h1>
            </div>
            <div class="content">
              <p>Hello!</p>
              <p>This is a test email to verify that your SMTP configuration is working correctly.</p>
              <p><strong>Configuration Details:</strong></p>
              <ul>
                <li><strong>SMTP Host:</strong> ${config.host}</li>
                <li><strong>Port:</strong> ${config.port}</li>
                <li><strong>From:</strong> ${config.fromName} &lt;${
      config.fromEmail
    }&gt;</li>
                <li><strong>Test sent at:</strong> ${new Date().toLocaleString()}</li>
              </ul>
              <p>If you received this email, your email configuration is working perfectly! 🚀</p>
            </div>
            <div class="footer">
              <p>This is an automated test email from your Email Dashboard application.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail(userId, {
      recipient: testEmail,
      subject: "✅ SMTP Configuration Test - Success!",
      html: testHtml,
    });
  }

  static async sendTemplateEmail(
    userId: string,
    templateId: string,
    recipient: string,
    variables: Record<string, string> = {}
  ) {
    const template = await prisma.emailTemplate.findFirst({
      where: {
        id: templateId,
        userId,
        status: "ACTIVE",
      },
    });

    if (!template) {
      throw new Error("Template not found or not active");
    }

    // Replace variables in subject and content
    let subject = template.subject;
    let content = template.content;

    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, "g"), value);
      content = content.replace(new RegExp(placeholder, "g"), value);
    });

    return await this.sendEmail(userId, {
      recipient,
      subject,
      html: content,
      templateId: template.id,
    });
  }
}
