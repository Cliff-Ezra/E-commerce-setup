import * as z from "zod";

/**
 * Represents a product schema.
 */

export const ProductSchema = z.object({
  /** Marked as optional. If it doesn't have an id == new product. If it has an id == editing product */
  id: z.number().optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  description: z
    .string()
    .min(40, { message: "Description must be at least 40 characters long" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be a positive number" }),
});
