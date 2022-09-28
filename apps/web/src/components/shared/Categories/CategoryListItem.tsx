import Link from "next/link";
import { useMemo } from "react";

export interface CategoryListItemProps {
	name: string;
	slug: string;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
	name,
	slug,
}) => {
	const formattedName = useMemo(
		() => (name.includes(" ") ? name.slice(name.lastIndexOf(" ")) : name),
		[name]
	);

	return (
		<li className="text-lg hover:underline underline-offset-[3px] decoration-teal-400 decoration-2 ml-2">
			<Link href={`/c/${slug}`}>{formattedName}</Link>
		</li>
	);
};
