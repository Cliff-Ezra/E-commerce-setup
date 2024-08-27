"use server";

import { RegisterSchema } from "@/types/schemas/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ first_name, last_name, email, phone, password }) => {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user is already in the db
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Check if email is already in the db then say it's in use, else if it is not register the user and send the verification email
    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Email confirmation resent" };
      }
      return { error: "Email already in use" };
    }
    // Logic for when the user is not registered
    await db.insert(users).values({
      email,
      name: `${first_name} ${last_name}`,
      phone,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );

    return { success: "Confirmation Email Sent!" };
  }
);
