"use server";

import { ProductSchema } from "@/types/schemas/product-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";

const action = createSafeActionClient();

export const createProduct = action(
  ProductSchema,
  async ({ id, title, description, price }) => {
    try {
      if (id) {
        const currentProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!currentProduct) return { error: "Product not found" };

        const editedProduct = await db
          .update(products)
          .set({ title, description, price })
          .where(eq(products.id, id))
          .returning();
        return {
          success: `Product ${editedProduct[0].title} has been created`,
        };
      }
      if (!id) {
        const newProduct = await db
          .insert(products)
          .values({ title, description, price })
          .returning();
        return { success: `Product ${newProduct[0].title} has been created` };
      }
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }
);
