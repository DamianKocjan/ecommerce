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
				"group flex items-center rounded-md px-2 py-2 text-sm font-medium",
			)}
		>
			<Icon
				className={classNames(
					isCurrent
						? "text-gray-500"
						: "text-gray-400 group-hover:text-gray-500",
					"mr-3 h-6 w-6 flex-shrink-0",
				)}
				aria-hidden="true"
			/>
			{name}
		</Link>
	);
};
