import Link from "next/link";
import React from "react";
import { classNames } from "../../../utils/classnames";

export interface MenuItemProps {
	isCurrent: boolean;
	name: string;
	href: string;
	icon: React.FC<{ className?: string }>;
}

export const MenuItem: React.FC<MenuItemProps> = ({
	isCurrent,
	name,
	href,
	icon: Icon,
}) => {
	return (
		<Link
			key={name}
			href={href}
			className={classNames(
				isCurrent
					? "bg-gray-100 text-gray-900"
					: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
				"group flex items-center px-2 py-2 text-sm font-medium",
			)}
		>
			<Icon
				className={classNames(
					isCurrent ? "text-black" : "text-gray-600 group-hover:text-gray-900",
					"mr-4 h-6 w-6 flex-shrink-0 md:mr-3",
				)}
				aria-hidden="true"
			/>
			{name}
		</Link>
	);
};
