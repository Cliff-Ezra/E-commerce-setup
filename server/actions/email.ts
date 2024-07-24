"use server";

import { EmailTemplate } from "@/components/auth/email-template";
import getBaseURL from "@/lib/base-url";
import { Resend } from "resend";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-email-verification?token=${token}`;

  // Find the user created in the DB
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  const userName = existingUser?.name || "User";

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "E-Commerce - Confirm Your Email",
    text: "",
    react: EmailTemplate({ email, confirmLink, userName }),
  });

  if (error) return { error };

  if (data) return data;
};
