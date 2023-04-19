import type { Prisma, PrismaClient } from "../..";

const GENDER_CATEGORIES: Prisma.CategoryCreateInput[] = [
	{
		name: "Women",
		slug: "women",
	},
	{
		name: "Men",
		slug: "men",
	},
	{
		name: "Kids",
		slug: "kids",
	},
];

const CATEGORIES: Prisma.CategoryCreateInput[] = [
	{
		name: "Clothes",
		slug: "clothes",
	},
	{
		name: "Footwear",
		slug: "footwear",
	},
	{
		name: "Sport",
		slug: "sport",
	},
	{
		name: "Accessories",
		slug: "accessories",
	},
	{
		name: "New",
		slug: "new",
	},
	{
		name: "Sale",
		slug: "sale",
	},
	{
		name: "Cosmetics",
		slug: "cosmetics",
	},
];

const SUBCATEGORIES: Prisma.CategoryCreateInput[] = GENDER_CATEGORIES.map(
	(cat) => [
		...CATEGORIES.map((subcat) => ({
			name: `${cat.name} ${subcat.name}`,
			slug: `${cat.slug}-${subcat.slug}`,
			parentCategory: {
				connect: {
					slug: cat.slug,
				},
			},
		})),
	],
).reduce((prev, curr) => prev.concat(curr), []);

export async function seedCategories(prisma: PrismaClient): Promise<void> {
	await prisma.category
		.createMany({ data: GENDER_CATEGORIES })
		.then(() =>
			CATEGORIES.map(
				async (cat) => await prisma.category.create({ data: cat }),
			),
		)
		.then(() =>
			SUBCATEGORIES.map(
				async (cat) => await prisma.category.create({ data: cat }),
			),
		);
}
