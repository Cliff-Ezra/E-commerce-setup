import * as z from "zod";

/**
 * Schema for validating variant data.
 */
export const VariantSchema = z.object({
  /**
   * The ID of the product.
   * @type {number}
   */
  productID: z.number(),

  /**
   * The ID of the variant.
   * @type {number}
   */
  id: z.number().optional(),

  /**
   * Indicates if the variant is in edit mode.
   * @type {boolean}
   */
  editMode: z.boolean(),

  /**
   * The type of the product.
   * Must be at least 3 characters long.
   * @type {string}
   * @minLength 3
   * @message "Product type must be at least 3 characters long"
   */
  productType: z
    .string()
    .min(3, { message: "Product type must be at least 3 characters long" }),

  /**
   * The color of the variant.
   * Must be at least 3 characters long.
   * @type {string}
   * @minLength 3
   * @message "Color must be at least 3 characters long"
   */
  color: z
    .string()
    .min(3, { message: "Color must be at least 3 characters long" }),

  /**
   * Tags associated with the variant.
   * Must provide at least one tag.
   * @type {string[]}
   * @minItems 1
   * @message "Please provide at least one tag"
   */
  tags: z.array(
    z.string().min(1, { message: "Please provide at least one tag" })
  ),

  /**
   * Images associated with the variant.
   * Each image must have a URL, size, and name.
   * Optional properties: key, id.
   * URL must not start with "blob:".
   * @type {Array<{ url: string, size: number, key?: string, id?: number, name: string }>}
   * @message "Please wait for the image to upload"
   */
  variantImages: z.array(
    z.object({
      url: z.string().refine((url) => url.search("blob:") !== 0, {
        message: "Please wait for the image to upload",
      }),
      size: z.number(),
      key: z.string().optional(),
      id: z.number().optional(),
      name: z.string(),
    })
  ),
});
