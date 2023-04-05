import { type Icon } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useMemo } from "react";

import { classNames } from "../../../utils/classnames";
import { useSidebar, type Path } from "./store";

export interface MenuItemProps {
	name: string;
	href: string;
	icon: Icon;
	path: Path;
}

export const MenuItem: React.FC<MenuItemProps> = ({
	name,
	href,
	icon: Icon,
	path,
}) => {
	const currentPath = useSidebar((state) => state.currentPath);
	const setCurrentPath = useSidebar((state) => state.setCurrentPath);

	const isCurrent = useMemo(() => currentPath === path, [currentPath, path]);

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
			onClick={() => setCurrentPath(path)}
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
