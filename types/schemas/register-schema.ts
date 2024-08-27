import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters" }),
  phone: z
    .string()
    .refine((value) => value.startsWith("+"), {
      message: "Phone number must start with '+'",
    })
    .refine((value) => /^\+[0-9]+$/.test(value), {
      message: "Phone number must contain only digits after '+'",
    })
    .refine((value) => value.length >= 6, {
      message: "Phone number is too short",
    })
    .refine((value) => value.length <= 16, {
      message: "Phone number is too long",
    })
    .refine((value) => value[1] !== "0", {
      message: "Phone number can't start with '0' after '+'",
    })
    .refine((value) => !/[a-zA-Z]/.test(value), {
      message: "Phone number must not contain any letters",
    }),
});
