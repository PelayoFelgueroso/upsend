import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name should have at least 2 characters."),
    email: z.string().email("Invalid email"),
    country: z.string(),
    password: z
      .string()
      .min(8, "Password should have at least 8 characters.")
      .regex(/[A-Z]/, "Password should have at least one uppercase.")
      .regex(/\d/, "Password should have at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password should have at least one special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
