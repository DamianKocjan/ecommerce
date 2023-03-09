import {
	Calendar,
	ChartBar,
	EnvelopeSimple,
	Folder,
	House,
	Users,
} from "@phosphor-icons/react";

export const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: House, current: true },
	{ name: "Team", href: "/dashboard", icon: Users, current: false },
	{ name: "Projects", href: "/dashboard", icon: Folder, current: false },
	{ name: "Calendar", href: "/dashboard", icon: Calendar, current: false },
	{
		name: "Documents",
		href: "/dashboard",
		icon: EnvelopeSimple,
		current: false,
	},
	{ name: "Reports", href: "/dashboard", icon: ChartBar, current: false },
];

export const userNavigation = [
	{ name: "Your Profile", href: "/dashboard" },
	{ name: "Settings", href: "/dashboard" },
];
