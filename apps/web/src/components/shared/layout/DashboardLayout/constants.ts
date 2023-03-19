import {
	Basket,
	ChartBar,
	House,
	Package,
	ThumbsUp,
} from "@phosphor-icons/react";

export const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: House, current: true },
	{ name: "Sales", href: "/dashboard/sales", icon: Package, current: false },
	{
		name: "Products",
		href: "/dashboard/products",
		icon: Basket,
		current: false,
	},
	{
		name: "Reviews",
		href: "/dashboard/reviews",
		icon: ThumbsUp,
		current: false,
	},
	{ name: "Reports", href: "/dashboard", icon: ChartBar, current: false },
];

export const userNavigation = [
	{ name: "Your Profile", href: "/dashboard" },
	{ name: "Settings", href: "/dashboard" },
];
