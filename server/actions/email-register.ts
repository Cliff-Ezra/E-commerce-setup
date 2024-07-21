"use server";

import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { users } from "../schema";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ first_name, last_name, email, phone, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Check if email is already in the db then say it's in use, else if it is not register the user and send the verification email
    if (existingUser) {
      // if(!existingUser.emailVerified) {
      //     const verificationToken =
      // }
      return { error: "Email already in use" };
    }
    return { success: `Yay!! ${email}` };
  }
);
