import { CategoryItemProps as DesktopCategoryItemProps } from "./Desktop";
import { CategoryItemProps as MobileCategoryItemProps } from "./Mobile";

export const MOBILE_CATEGORIES: MobileCategoryItemProps[] = [
	{ name: "New", href: "/c/new" },
	{ name: "Clothes", href: "/c/clothes" },
	{ name: "Footwear", href: "/c/footwear" },
	{ name: "Sport", href: "/c/sport" },
	{ name: "Accessories", href: "/c/accessories" },
	{ name: "Brands", href: "/c/brands" },
	{ name: "Sale", href: "/c/sale" },
];

export const DESKTOP_CATEGORIES: DesktopCategoryItemProps[] = [
	{
		name: "New",
		href: "/c/new",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [
					{
						name: "Clothes",
						href: "/c/clothes",
					},
					{
						name: "Footwear",
						href: "/c/footwear",
					},
					{
						name: "Accessories",
						href: "/c/accessories",
					},
					{
						name: "Dresses",
						href: "/c/dresses",
					},
					{
						name: "T-shirts and tops",
						href: "/c/t-shirts-and-tops",
					},
					{
						name: "Pants",
						href: "/c/pants",
					},
					{
						name: "Sandals and flip-flops",
						href: "/c/sandals-and-flip-flops",
					},
					{
						name: "Bags and backpacks",
						href: "/c/bags-and-backpacks",
					},
					{
						name: "Sport",
						href: "/c/sport",
					},
					{
						name: "Beauty",
						href: "/c/beauty",
					},
				],
			},
			{
				subtitle: "Men",
				categories: [
					{
						name: "Clothes",
						href: "/c/clothes",
					},
					{
						name: "Footwear",
						href: "/c/footwear",
					},
					{
						name: "Accessories",
						href: "/c/accessories",
					},
					{
						name: "T-shirts",
						href: "/c/t-shirts",
					},
					{
						name: "Sweatshirts and sweaters",
						href: "/c/sweatshirts-and-sweaters",
					},
					{
						name: "Pants",
						href: "/c/pants",
					},
					{
						name: "Sneakers",
						href: "/c/sneakers",
					},
					{
						name: "Summer shoes",
						href: "/c/summer-shoes",
					},
					{
						name: "Sport",
						href: "/c/sport",
					},
					{
						name: "Cosmetics",
						href: "/c/cosmetics",
					},
				],
			},
			{
				subtitle: "Kids",
				categories: [
					{
						name: "Clothes",
						href: "/c/clothes",
					},
					{
						name: "Footwear",
						href: "/c/footwear",
					},
					{
						name: "Accessories",
						href: "/c/accessories",
					},
					{
						name: "T-shirts",
						href: "/c/t-shirts",
					},
					{
						name: "Sweatshirts and sweaters",
						href: "/c/sweatshirts-and-sweaters",
					},
					{
						name: "Pants",
						href: "/c/pants",
					},
					{
						name: "Sneakers",
						href: "/c/sneakers",
					},
					{
						name: "Summer shoes",
						href: "/c/summer-shoes",
					},
					{
						name: "Sport",
						href: "/c/sport",
					},
					{
						name: "Cosmetics",
						href: "/c/cosmetics",
					},
				],
			},
		],
	},
	{
		name: "Clothes",
		href: "/c/clothes",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [
					{
						name: "See all",
						href: "/c/women-clothes",
					},
					{
						name: "Dresses",
						href: "/c/dresses",
					},
					{
						name: "Pants",
						href: "/c/pants",
					},
					{
						name: "Skirts",
						href: "/c/skirts",
					},
					{
						name: "Jeans",
						href: "/c/jeans",
					},
					{
						name: "T-shirts and tops",
						href: "/c/t-shirts-and-tops",
					},
					{
						name: "Blouses and shirts",
						href: "/c/blouses-and-shirts",
					},
					{
						name: "Jackets",
						href: "/c/jackets",
					},
					{
						name: "Transition jackets",
						href: "/c/transition-jackets",
					},
					{
						name: "Underwear and swimwear",
						href: "/c/underwear-and-swimwear",
					},
					{
						name: "Socks and tights",
						href: "/c/socks-and-tights",
					},
				],
			},
			{
				subtitle: "Men",
				categories: [
					{
						name: "See all",
						href: "/c/men-clothes",
					},
					{
						name: "T-shirts",
						href: "/c/t-shirts",
					},
					{
						name: "Shirts",
						href: "/c/shirts",
					},
					{
						name: "Sweatshirts and sweaters",
						href: "/c/sweatshirts-and-sweaters",
					},
					{
						name: "Jackets",
						href: "/c/jackets",
					},
					{
						name: "Jeans",
						href: "/c/jeans",
					},
					{
						name: "Pants",
						href: "/c/pants",
					},
					{
						name: "Suits",
						href: "/c/suits",
					},
					{
						name: "Transition jackets",
						href: "/c/transition-jackets",
					},
					{
						name: "Underwear",
						href: "/c/underwear",
					},
					{
						name: "Socks",
						href: "/c/socks",
					},
				],
			},
			{
				subtitle: "Kids",
				categories: [],
			},
		],
	},
	{
		name: "Footwear",
		href: "/c/footwear",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [],
			},
			{
				subtitle: "Men",
				categories: [],
			},
			{
				subtitle: "Kids",
				categories: [],
			},
		],
	},
	{
		name: "Sport",
		href: "/c/sport",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [],
			},
			{
				subtitle: "Men",
				categories: [],
			},
			{
				subtitle: "Kids",
				categories: [],
			},
		],
	},
	{
		name: "Accessories",
		href: "/c/accessories",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [],
			},
			{
				subtitle: "Men",
				categories: [],
			},
			{
				subtitle: "Kids",
				categories: [],
			},
		],
	},
	{
		name: "Brands",
		href: "/c/brands",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [],
			},
			{
				subtitle: "Men",
				categories: [],
			},
			{
				subtitle: "Kids",
				categories: [],
			},
		],
	},
	{
		name: "Sale",
		href: "/c/sale",
		image: "https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [],
			},
			{
				subtitle: "Men",
				categories: [],
			},
			{
				subtitle: "Kids",
				categories: [],
			},
		],
	},
];
