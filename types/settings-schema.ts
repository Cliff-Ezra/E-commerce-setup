import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  // Refine the schema to ensure that the password and new password are not the same
  .refine(
    (data) => {
      // If password is provided, newPassword is required
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password and new password cannot be the same.",
      path: ["newPassword"],
    }
  );
