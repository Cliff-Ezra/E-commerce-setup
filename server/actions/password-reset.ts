"use server";

import { ResetSchema } from "@/types/schemas/password-reset-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generatePasswordResetToken } from "./tokens";
import { sendPasswordResetEmail } from "./email";

const action = createSafeActionClient();

export const reset = action(ResetSchema, async ({ email }) => {
  try {
    // Check if the user is in the db
    const existingUser = db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) return { error: "User not found" };

    // Create a password reset token
    const passwordResetToken = await generatePasswordResetToken(email);
    if (!passwordResetToken) return { error: "Token not generated" };

    await sendPasswordResetEmail(
      passwordResetToken[0].email,
      passwordResetToken[0].token
    );

    return { success: "Password Reset Email Sent" };
  } catch (error) {
    console.log(error);
  }
});
