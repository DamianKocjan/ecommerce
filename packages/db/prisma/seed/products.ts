import type { PrismaClient } from "../..";
import { randomBool, randomElement, randomInt } from "./utils";

const NUMBER_OF_PRODUCTS = 400;
const MAX_NUMBER_OF_CATEGORIES = 20;

export async function seedProducts(prisma: PrismaClient): Promise<void> {
	const deliveryOption = await prisma.deliveryOption.create({
		data: {
			storePickup: true,
			type: "STANDARD",
		},
	});
	const manufacturers = await prisma.manufacturer.findMany();
	const categories = await prisma.category.findMany();
	const sizes = await prisma.size.findMany();
	const colors = await prisma.color.findMany();

	for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
		// FIXME: Improve offset calculation
		const categoryOffset =
			Math.floor(Math.random() * MAX_NUMBER_OF_CATEGORIES) + 1;
		const categoriesForProduct = categories
			.slice(
				categoryOffset,
				categoryOffset + Math.floor(Math.random() * MAX_NUMBER_OF_CATEGORIES),
			)
			.map((category) => ({ id: category.id }));

		const colorsForProduct = colors
			.slice(0, Math.floor(Math.random() * colors.length) + 1)
			.map((color) => ({ id: color.id }));

		await prisma.product.create({
			data: {
				title: `Product ${i}`,
				shortDescription: `Product ${i} short description`,
				description: `Product ${i} description`,
				thumbnailImage: `https://picsum.photos/seed/${i}/800/600`,
				price: randomInt(0, 100),
				quantity: randomInt(0, 100),
				slug: `product-${i}`,
				activatiedAt: randomBool(0.33) ? new Date() : null,
				multipack: randomBool(0.5),
				manufacturerId: randomElement(manufacturers).id,
				deliveryOptionId: deliveryOption.id,
				categories: {
					connect: categoriesForProduct,
				},
				sizeId: randomElement(sizes).id,
				colors: {
					connect: colorsForProduct,
				},
			},
		});
	}
}
