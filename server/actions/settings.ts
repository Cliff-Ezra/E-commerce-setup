"use server";

import bcrypt from "bcrypt";
import { SettingsSchema } from "@/types/settings-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const settings = action(SettingsSchema, async (values) => {
  try {
    const user = await auth();
    if (!user) return { error: "User not found" };

    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, user.user.id),
    });

    if (!dbUser) return { error: "User not found" };

    // Check if user is using oath (google, github, etc)
    if (user.user.isOath) {
      values.email = undefined;
      values.password = undefined;
      values.newPassword = undefined;
      values.isTwoFactorEnabled = undefined;
    }

    if (values.password && values.newPassword && dbUser.password) {
      const passwordMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );
      if (!passwordMatch) {
        return { error: "Wrong password entered" };
      }

      const samePassword = await bcrypt.compare(
        values.newPassword,
        dbUser.password
      );
      if (samePassword) {
        return { error: "New password is the same as the old password" };
      }

      const hashedPassword = await bcrypt.hash(values.newPassword, 10);
      values.password = hashedPassword;
      values.newPassword = undefined;
    }
    const updatedUser = await db
      .update(users)
      .set({
        name: values.name,
        email: values.email,
        image: values.image,
        password: values.password,
        twoFactorEnabled: values.isTwoFactorEnabled,
      })
      .where(eq(users.id, dbUser.id));
    revalidatePath("/dashboard/settings");
    return { success: "Settings Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
});
