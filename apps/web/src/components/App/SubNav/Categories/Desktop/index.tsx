import { Flex } from "@ecommerce/ui";
import { CategoryItem, CategoryItemProps } from "./CategoryItem";

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
			className="md:flex-nowrap hidden"
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
