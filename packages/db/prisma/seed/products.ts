import { faker } from "@faker-js/faker";
import type { PrismaClient, Season } from "../..";
import { randomElement, randomInt, slugify } from "./utils";

const NUMBER_OF_PRODUCTS = 2000;
const MAX_NUMBER_OF_CATEGORIES = 5;

export async function seedProducts(prisma: PrismaClient): Promise<void> {
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

	const attributes = await generateAttributes(prisma, categories);

	const productsData = Array.from({ length: NUMBER_OF_PRODUCTS }, (_, index) =>
		generateProductData(index, attributes),
	);

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
			await prisma.productVariant.create({
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
					attributes: {
						connect: variantData.attributes.map((attr) => ({
							id: attr,
						})),
					},
				},
				select: {
					id: true,
				},
			});
		}
	}
}

const ATTRIBUTES_DATA = [
	{
		name: "Size",
		values: ["XS", "S", "M", "L", "XL", "XXL"],
	},
	{
		name: "Color",
		values: [
			"Red",
			"Green",
			"Blue",
			"Yellow",
			"Black",
			"White",
			"Gray",
			"Orange",
			"Purple",
			"Brown",
		],
	},
	{
		name: "Material",
		values: ["Cotton", "Polyester", "Silk", "Wool", "Leather"],
	},
	{
		name: "Pattern",
		values: ["Solid", "Striped", "Checkered", "Floral", "Abstract"],
	},
	{
		name: "Fit",
		values: ["Slim", "Regular", "Loose"],
	},
	{
		name: "Style",
		values: ["Formal", "Casual", "Sportswear", "Streetwear", "Bohemian"],
	},
	{
		name: "Neckline",
		values: ["V-Neck", "Round Neck", "Square Neck", "Boat Neck", "Halter Neck"],
	},
	{
		name: "Sleeve Length",
		values: [
			"Sleeveless",
			"Short Sleeve",
			"Half Sleeve",
			"3/4 Sleeve",
			"Long Sleeve",
		],
	},
	{
		name: "Occasion",
		values: ["Work", "Casual", "Party", "Formal", "Wedding"],
	},
];

type Attribute = {
	id: number;
	name: string;
	values: {
		id: number;
		value: string;
	}[];
};

async function generateAttributes(
	prisma: PrismaClient,
	categories: {
		id: number;
	}[],
) {
	const attributes: Attribute[] = [];

	for (const attributeData of ATTRIBUTES_DATA) {
		const attr = {
			id: 0,
			name: attributeData.name,
			values: [],
		} as Attribute;

		const attribute = await prisma.attribute.create({
			data: {
				name: attributeData.name,
				category: {
					connect: randomElement(categories),
				},
			},
			select: {
				id: true,
			},
		});

		attr.id = attribute.id;

		for (const value of attributeData.values) {
			const attributeValue = await prisma.attributeValue.create({
				data: {
					value,
					attribute: {
						connect: attribute,
					},
				},
				select: {
					id: true,
				},
			});

			attr.values.push({
				id: attributeValue.id,
				value,
			});
		}

		attributes.push(attr);
	}

	return attributes;
}

function generateProductData(index: number, attributes: Attribute[]) {
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
			attributes: faker.helpers
				.shuffle(attributes)
				.slice(0, faker.number.int({ min: 2, max: 5 }))
				.map(
					(attr) =>
						faker.helpers
							.shuffle(attr.values)
							.slice(0, 1)
							.map((v) => v.id)[0]!,
				),
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
