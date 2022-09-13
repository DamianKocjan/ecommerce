import Link from "next/link";

export interface CategoryListItemProps {
	category: {
		name: string;
		slug: string;
	};
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
	category,
}) => {
	return (
		<li className="text-lg hover:underline underline-offset-[3px] decoration-teal-400 decoration-2 ml-2">
			<Link href={`/c/${category.slug}`}>{category.name}</Link>
		</li>
	);
};
