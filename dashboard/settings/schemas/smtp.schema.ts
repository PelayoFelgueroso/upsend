import { z } from "zod";

export const smtpConfigSchema = z.object({
  host: z.string().min(1, "Host is required"),
  port: z.number().min(1).max(65535, "Port must be between 1 and 65535"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type SmtpConfigForm = z.infer<typeof smtpConfigSchema>;

export const senderSettingsSchema = z.object({
  fromEmail: z.string().email("Invalid email format"),
  fromName: z.string().min(1, "From name is required"),
  replyToEmail: z
    .string()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
});

export type SenderSettingsForm = z.infer<typeof senderSettingsSchema>;

export const testEmailSchema = z.object({
  testEmail: z.string().email("Invalid email format"),
});

export type TestEmailForm = z.infer<typeof testEmailSchema>;
