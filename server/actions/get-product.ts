"use server";

import { ProductSchema } from "@/types/schemas/product-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";

const action = createSafeActionClient();

export const getProduct = action(ProductSchema, async ({ id }) => {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    })
    if (!product) throw new Error("Product not found")
    return { success: product }
  } catch (error) {
    return { error: "Failed to get product" }
  }
});
