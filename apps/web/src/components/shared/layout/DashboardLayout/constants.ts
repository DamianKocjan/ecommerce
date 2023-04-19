import {
	Basket,
	ChartBar,
	House,
	Package,
	ThumbsUp,
	type Icon,
} from "@phosphor-icons/react";

import { type Path } from "./Sidebar/store";

type NavigationItem = {
	name: string;
	href: string;
	icon: Icon;
	path: Path;
};

export const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: House, path: "HOME" },
	{ name: "Sales", href: "/dashboard/sales", icon: Package, path: "SALES" },
	{
		name: "Products",
		href: "/dashboard/products",
		icon: Basket,
		path: "PRODUCTS",
	},
	{
		name: "Reviews",
		href: "/dashboard/reviews",
		icon: ThumbsUp,
		path: "REVIEWS",
	},
	{ name: "Reports", href: "/dashboard", icon: ChartBar, path: "REPORTS" },
] as NavigationItem[];

export const userNavigation = [
	{ name: "Your Profile", href: "/dashboard" },
	{ name: "Settings", href: "/dashboard" },
];
