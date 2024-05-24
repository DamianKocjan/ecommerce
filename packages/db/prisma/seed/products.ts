import { faker } from "@faker-js/faker";
import type { PrismaClient, Season } from "../..";
import { randomElement, randomInt, slugify } from "./utils";

const NUMBER_OF_PRODUCTS = 2000;
const MAX_NUMBER_OF_CATEGORIES = 5;

export async function seedProducts(prisma: PrismaClient): Promise<void> {
	const productsData = Array.from({ length: NUMBER_OF_PRODUCTS }, (_, index) =>
		generateProductData(index),
	);

	const deliveryOption = await prisma.deliveryOption.create({
		data: {
			storePickup: true,
			type: "STANDARD",
		},
		select: {
			id: true,
		},
	});

	const manufacturers = await prisma.manufacturer.findMany({
		select: {
			id: true,
		},
	});

	const categories = await prisma.category.findMany({
		select: {
			id: true,
		},
	});

	for (const [index, productData] of productsData.entries()) {
		// FIXME: Improve offset calculation
		const categoryOffset = randomInt(0, categories.length - 1);
		const categoriesForProduct = categories.slice(
			categoryOffset,
			categoryOffset + randomInt(1, MAX_NUMBER_OF_CATEGORIES),
		);

		const product = await prisma.product.create({
			data: {
				title: productData.title,
				slug: slugify(productData.title + "-" + index),
				description: productData.description,
				shortDescription: productData.shortDescription,
				multiPack: productData.multiPack,
				multiPackQuantity: productData.multiPackQuantity,
				season: productData.season,
				price: productData.price,
				deliveryOption: {
					connect: deliveryOption,
				},
				manufacturer: {
					connect: randomElement(manufacturers),
				},
				categories: {
					connect: categoriesForProduct,
				},
			},
			select: {
				id: true,
			},
		});

		// Create Product Variants, Images, Attributes, and Attribute Values
		for (const variantData of productData.variants) {
			const productVariant = await prisma.productVariant.create({
				data: {
					sku: variantData.sku,
					title: variantData.title,
					price: variantData.price || productData.price,
					thumbnailImage: variantData.thumbnailImage,
					product: {
						connect: product,
					},
					images: {
						createMany: {
							data: variantData.images.map((image) => ({
								url: image.url,
							})),
						},
					},
				},
				select: {
					id: true,
				},
			});

			// Create Attributes and AttributeValues for each variant
			for (const attributeData of variantData.attributes) {
				const existingAttribute = await prisma.attribute.findFirst({
					where: { name: attributeData.name },
					select: {
						id: true,
					},
				});

				const attribute = existingAttribute
					? await prisma.attribute.update({
							where: { id: existingAttribute.id },
							data: {
								category: {
									connect: randomElement(categoriesForProduct),
								},
								products: {
									connect: product,
								},
							},
							select: {
								id: true,
							},
					  })
					: await prisma.attribute.create({
							data: {
								name: attributeData.name,
								category: {
									connect: randomElement(categoriesForProduct),
								},
								products: {
									connect: product,
								},
							},
							select: {
								id: true,
							},
					  });

				const attributeValue = await prisma.attributeValue.findFirst({
					where: {
						attributeId: attribute.id,
						value: attributeData.value,
					},
					select: {
						id: true,
					},
				});

				if (attributeValue) {
					await prisma.attributeValue.update({
						where: {
							id: attributeValue.id,
						},
						data: {
							productVariant: {
								connect: productVariant,
							},
							products: {
								connect: product,
							},
						},
					});
				} else {
					await prisma.attributeValue.create({
						data: {
							value: attributeData.value,
							attribute: {
								connect: attribute,
							},
							productVariant: {
								connect: productVariant,
							},
							products: {
								connect: product,
							},
						},
					});
				}
			}
		}
	}
}

function generateProductData(index: number) {
	const numVariants = faker.number.int({ min: 1, max: 3 });
	const variants = [];

	for (let i = 0; i < numVariants; i++) {
		const numImages = faker.number.int({ min: 3, max: 6 });
		const images = [];

		for (let j = 0; j < numImages; j++) {
			images.push({
				url: `https://picsum.photos/seed/${faker.number.int()}/800/600`,
			});
		}

		variants.push({
			sku: `SKU-${index + 1}-${i + 1}`,
			title: `Product ${index + 1} - Variant ${i + 1}`,
			thumbnailImage: 0,
			images,
			attributes: [
				{ name: "Size", value: faker.helpers.arrayElement(["S", "M", "L"]) },
				{ name: "Color", value: faker.color.human() },
			],
			price: faker.datatype.boolean({
				probability: 0.2,
			})
				? faker.commerce.price({ min: 50, max: 500, dec: 2 })
				: undefined,
		});
	}

	const multiPack = faker.datatype.boolean();

	return {
		title: faker.commerce.productName() + " " + index,
		description: faker.commerce.productDescription(),
		shortDescription: faker.lorem.sentence(),
		multiPack,
		multiPackQuantity: multiPack ? faker.number.int({ min: 1, max: 5 }) : 1,
		season: faker.helpers.arrayElement([
			"SUMMER",
			"WINTER",
			"ALL",
			"AUTUMN",
			"SPRING",
		]) as Season,
		price: faker.commerce.price({ min: 50, max: 500, dec: 2 }),
		defaultVariant: 0,
		variants,
	};
}
