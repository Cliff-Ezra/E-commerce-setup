"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { db } from "..";

const action = createSafeActionClient();

export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    // Check if the user is in the db
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "User not found" };
    }

    // if (!existingUser.emailVerified) {
    // }

    console.log(email, password, code);
    return { success: email };
  }
);
