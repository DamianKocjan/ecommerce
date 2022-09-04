import React from "react";
import {
	CategoryItemProps as DesktopCategoryItemProps,
	DesktopCategories,
} from "./Desktop";
import {
	CategoryItemProps as MobileCategoryItemProps,
	MobileCategories,
} from "./Mobile";

const MOBILE_CATEGORIES: MobileCategoryItemProps[] = [
	{ name: "New", href: "/c/new" },
	{ name: "Clothes", href: "/c/clothes" },
	{ name: "Footwear", href: "/c/footwear" },
	{ name: "Sport", href: "/c/sport" },
	{ name: "Accessories", href: "/c/accessories" },
	{ name: "Brands", href: "/c/brands" },
	{ name: "Sale", href: "/c/sale" },
];

const DESKTOP_CATEGORIES: DesktopCategoryItemProps[] = [
	{
		name: "New",
		href: "/c/new",
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
		columns: [
			{
				subtitle: "Women",
				categories: [
					{
						name: "Clothes",
						href: "/clothes",
					},
					{
						name: "Footwear",
						href: "/footwear",
					},
					{
						name: "Accessories",
						href: "/accessories",
					},
					{
						name: "Dresses",
						href: "/dresses",
					},
					{
						name: "T-shirts and tops",
						href: "/t-shirts-and-tops",
					},
					{
						name: "Pants",
						href: "/pants",
					},
					{
						name: "Sandals and flip-flops",
						href: "/sandals-and-flip-flops",
					},
					{
						name: "Bags and backpacks",
						href: "/bags-and-backpacks",
					},
					{
						name: "Sport",
						href: "/sport",
					},
					{
						name: "Beauty",
						href: "/beauty",
					},
				],
			},
			{
				subtitle: "Men",
				categories: [
					{
						name: "Clothes",
						href: "/clothes",
					},
					{
						name: "Footwear",
						href: "/footwear",
					},
					{
						name: "Accessories",
						href: "/accessories",
					},
					{
						name: "T-shirts",
						href: "/t-shirts",
					},
					{
						name: "Sweatshirts and sweaters",
						href: "/sweatshirts-and-sweaters",
					},
					{
						name: "Pants",
						href: "/pants",
					},
					{
						name: "Sneakers",
						href: "/sneakers",
					},
					{
						name: "Summer shoes",
						href: "/summer-shoes",
					},
					{
						name: "Sport",
						href: "/sport",
					},
					{
						name: "Cosmetics",
						href: "/cosmetics",
					},
				],
			},
			{
				subtitle: "Kids",
				categories: [
					{
						name: "Clothes",
						href: "/clothes",
					},
					{
						name: "Footwear",
						href: "/footwear",
					},
					{
						name: "Accessories",
						href: "/accessories",
					},
					{
						name: "T-shirts",
						href: "/t-shirts",
					},
					{
						name: "Sweatshirts and sweaters",
						href: "/sweatshirts-and-sweaters",
					},
					{
						name: "Pants",
						href: "/pants",
					},
					{
						name: "Sneakers",
						href: "/sneakers",
					},
					{
						name: "Summer shoes",
						href: "/summer-shoes",
					},
					{
						name: "Sport",
						href: "/sport",
					},
					{
						name: "Cosmetics",
						href: "/cosmetics",
					},
				],
			},
		],
	},
	{
		name: "Clothes",
		href: "/c/clothes",
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
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
		name: "Footwear",
		href: "/c/footwear",
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
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
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
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
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
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
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
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
		image:
			"https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg",
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

export const Categories: React.FC = () => {
	return (
		<>
			<DesktopCategories categories={DESKTOP_CATEGORIES} />
			<MobileCategories categories={MOBILE_CATEGORIES} />
		</>
	);
};
