import { CategoryItem, CategoryItemProps } from "./CategoryItem";

export interface DesktopCategoriesProps {
	categories: CategoryItemProps[];
}

export type { CategoryItemProps };

export const DesktopCategories: React.FC<DesktopCategoriesProps> = ({
	categories,
}) => {
	return (
		<ul className="items-center justify-between flex-wrap md:flex-nowrap hidden md:flex">
			{categories.map(({ name, href, columns, image }, index) => (
				<CategoryItem
					key={index}
					name={name}
					href={href}
					columns={columns}
					image={image}
				/>
			))}
		</ul>
	);
};
