import dynamic from "next/dynamic";
import React from "react";

import { Flex } from "../../../../../../shared/core/Flex";
import { CategoryItemProps } from "./CategoryItem";

const CategoryItem = dynamic(
	() => import("./CategoryItem").then((mod) => mod.CategoryItem),
	{
		ssr: false,
	},
);

export interface DesktopCategoriesProps {
	categories: CategoryItemProps[];
}

export type { CategoryItemProps };

export const DesktopCategories: React.FC<DesktopCategoriesProps> = ({
	categories,
}) => {
	return (
		<Flex
			as="ul"
			media="md"
			items="center"
			justify="between"
			wrap="wrap"
			className="hidden md:flex-nowrap"
		>
			{categories.map(({ name, href, columns, image }, index) => (
				<CategoryItem
					key={index}
					name={name}
					href={href}
					columns={columns}
					image={image}
				/>
			))}
		</Flex>
	);
};
