import type { Prisma, PrismaClient } from "..";

const BASE_CATEGORIES: Prisma.CategoryCreateInput[] = [
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
];

const BASE_WOMEN_CATEGORIES: Prisma.CategoryCreateInput[] = [
	{
		name: "Clothes",
		slug: "women-clothes",
		parentCategory: {
			connect: {
				slug: "women",
			},
		},
	},
	{
		name: "Footwear",
		slug: "women-footwear",
		parentCategory: {
			connect: {
				slug: "women",
			},
		},
	},
	{
		name: "Sport",
		slug: "women-sport",
		parentCategory: {
			connect: {
				slug: "women",
			},
		},
	},
	{
		name: "Accessories",
		slug: "women-accessories",
		parentCategory: {
			connect: {
				slug: "women",
			},
		},
	},
	{
		name: "Beauty",
		slug: "women-beauty",
		parentCategory: {
			connect: {
				slug: "women",
			},
		},
	},
];

const BASE_MEN_CATEGORIES: Prisma.CategoryCreateInput[] = [
	{
		name: "Clothes",
		slug: "men-clothes",
		parentCategory: {
			connect: {
				slug: "men",
			},
		},
	},
	{
		name: "Footwear",
		slug: "men-footwear",
		parentCategory: {
			connect: {
				slug: "men",
			},
		},
	},
	{
		name: "Sport",
		slug: "men-sport",
		parentCategory: {
			connect: {
				slug: "men",
			},
		},
	},
	{
		name: "Accessories",
		slug: "men-accessories",
		parentCategory: {
			connect: {
				slug: "men",
			},
		},
	},
	{
		name: "Cosmetics",
		slug: "men-cosmetics",
		parentCategory: {
			connect: {
				slug: "men",
			},
		},
	},
];

const BASE_KIDS_CATEGORIES: Prisma.CategoryCreateInput[] = [
	{
		name: "Clothes",
		slug: "kids-clothes",
		parentCategory: {
			connect: {
				slug: "kids",
			},
		},
	},
	{
		name: "Footwear",
		slug: "kids-footwear",
		parentCategory: {
			connect: {
				slug: "kids",
			},
		},
	},
	{
		name: "Sport",
		slug: "kids-sport",
		parentCategory: {
			connect: {
				slug: "kids",
			},
		},
	},
	{
		name: "Accessories",
		slug: "kids-accessories",
		parentCategory: {
			connect: {
				slug: "kids",
			},
		},
	},
	{
		name: "Cosmetics",
		slug: "kids-cosmetics",
		parentCategory: {
			connect: {
				slug: "kids",
			},
		},
	},
];

const CATEGORIES: Prisma.CategoryCreateInput[] = [
	{
		name: "Dresses",
		slug: "women-dresses",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "T-shirts and tops",
		slug: "women-t-shirts-and-tops",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Blouses and shirts",
		slug: "women-blouses-and-shirts",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Pants",
		slug: "women-pants",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Jeans",
		slug: "women-jeans",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Sweatshirts",
		slug: "women-sweatshirts",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Jackets and blazers",
		slug: "women-jackets-and-blazers",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Coats",
		slug: "women-coats",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Sweaters and cardigans",
		slug: "women-sweaters-and-cardigans",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Beach fashion",
		slug: "women-beach-fashion",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Skirts",
		slug: "women-skirts",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Shorts",
		slug: "women-shorts",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Nightwear and pijamas",
		slug: "women-nightwear-and-pijamas",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Socks and tights",
		slug: "women-socks-and-tights",
		parentCategory: {
			connect: {
				slug: "women-clothes",
			},
		},
	},
	{
		name: "Sneakers",
		slug: "women-sneakers",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Sandals and flip-flops",
		slug: "women-sandals-and-flip-flops",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Flat shoes",
		slug: "women-flat-shoes",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Flip-flops",
		slug: "women-flip-flops",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Ballerina",
		slug: "women-ballerina",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Wedding shoes",
		slug: "women-wedding-shoes",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Home shoes",
		slug: "women-home-shoes",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Outdoor shoes",
		slug: "women-outdoor-shoes",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Accessories for shoes",
		slug: "women-accessories-for-shoes",
		parentCategory: {
			connect: {
				slug: "women-footwear",
			},
		},
	},
	{
		name: "Sportswear",
		slug: "women-sportswear",
		parentCategory: {
			connect: {
				slug: "women-sport",
			},
		},
	},
	{
		name: "Sports shoes",
		slug: "women-sports-shoes",
		parentCategory: {
			connect: {
				slug: "women-sport",
			},
		},
	},
	{
		name: "Sport Backpacks and bags",
		slug: "women-backpacks-and-bags",
		parentCategory: {
			connect: {
				slug: "women-sport",
			},
		},
	},
	{
		name: "Sport Accessories",
		slug: "women-sport-accessories",
		parentCategory: {
			connect: {
				slug: "women-sport",
			},
		},
	},
	{
		name: "Sport Equipment",
		slug: "women-sport-equipment",
		parentCategory: {
			connect: {
				slug: "women-sport",
			},
		},
	},
	{
		name: "Accessories bags and backpacks",
		slug: "women-accessories-bags-and-backpacks",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Accessories jewelry",
		slug: "women-accessories-jewelry",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Accessories watches",
		slug: "women-accessories-watches",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Accessories sunglasses",
		slug: "women-accessories-sunglasses",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Accessories wallets and cases",
		slug: "women-accessories-wallets-and-cases",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Accessories belts",
		slug: "women-accessories-belts",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Accessories others",
		slug: "women-accessories-others",
		parentCategory: {
			connect: {
				slug: "women-accessories",
			},
		},
	},
	{
		name: "Beauty makeup",
		slug: "women-beauty-makeup",
		parentCategory: {
			connect: {
				slug: "women-beauty",
			},
		},
	},
	{
		name: "Beauty hair",
		slug: "women-beauty-hair",
		parentCategory: {
			connect: {
				slug: "women-beauty",
			},
		},
	},
	{
		name: "Beauty perfume",
		slug: "women-beauty-perfume",
		parentCategory: {
			connect: {
				slug: "women-beauty",
			},
		},
	},
	{
		name: "Beauty nails",
		slug: "women-beauty-nails",
		parentCategory: {
			connect: {
				slug: "women-beauty",
			},
		},
	},
	{
		name: "Beauty sun care",
		slug: "women-beauty-sun-care",
		parentCategory: {
			connect: {
				slug: "women-beauty",
			},
		},
	},
	{
		name: "Beauty kits",
		slug: "women-beauty-kits",
		parentCategory: {
			connect: {
				slug: "women-beauty",
			},
		},
	},
];

export async function seedCategories(prisma: PrismaClient): Promise<void> {
	prisma.category
		.createMany({ data: BASE_CATEGORIES })
		.then(() =>
			BASE_WOMEN_CATEGORIES.map(
				async (category) => await prisma.category.create({ data: category })
			)
		)
		.then(() =>
			BASE_MEN_CATEGORIES.map(
				async (category) => await prisma.category.create({ data: category })
			)
		)
		.then(() =>
			BASE_KIDS_CATEGORIES.map(
				async (category) => await prisma.category.create({ data: category })
			)
		)
		.then(() =>
			CATEGORIES.map(
				async (category) => await prisma.category.create({ data: category })
			)
		);
}
