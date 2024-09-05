"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";
import * as z from "zod";

const action = createSafeActionClient();

// Remove the ProductSchema from the action, as we're passing just an id
export const getProduct = action(
  z.object({ id: z.number() }),
  async ({ id }) => {
    try {
      const product = await db.query.products.findFirst({
        where: eq(products.id, id),
      });
      if (!product) throw new Error("Product not found");
      return { success: product };
    } catch (error) {
      return { error: "Failed to get product" };
    }
  }
);
