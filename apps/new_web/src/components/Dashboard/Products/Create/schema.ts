import { z } from "zod";

export const productCreateSchema = z.object({
	title: z.string().min(3).max(250),
	description: z.string().min(3),
	shortDescription: z.string().min(3).max(250),
	multiPack: z.boolean(),
	multiPackQuantity: z.number().min(1).max(100).default(1),
	season: z.enum(["SPRING", "SUMMER", "AUTUMN", "WINTER", "ALL"]),
	// price for all variants (if some variant has different price, it will be overwritten)
	price: z.number().min(0),

	attributes: z.array(
		z.object({
			name: z.string().min(3).max(250),
			values: z.array(z.object({ value: z.string().min(3).max(250) })),
		}),
	),

	// index of the default variant in the variants array
	defaultVariant: z.number().default(0),
	skus: z
		.array(
			z.object({
				sku: z.string().min(3).max(250),
				title: z.string().min(3).max(250),
				price: z.number().min(0),
				// index of the image in the images array
				thumbnailImage: z.number(),
				images: z.array(
					z.object({
						url: z.string(),
					}),
				),
				attributes: z.array(
					z.object({
						name: z.string().min(3).max(250),
						value: z.string().min(3).max(250),
					}),
				),
			}),
		)
		.min(1),
});

export type Sku = z.infer<typeof productCreateSchema>["skus"][number];
export type Attribute = z.infer<
	typeof productCreateSchema
>["attributes"][number];
