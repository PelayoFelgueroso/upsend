import { z } from "zod";

export const templateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject too long"),
  content: z.string().min(10, "Content is required"),
  type: z.enum(["TRANSACTIONAL", "MARKETING", "NOTIFICATION"]),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]).optional(),
});

export type TemplateSchemaType = z.infer<typeof templateSchema>;
