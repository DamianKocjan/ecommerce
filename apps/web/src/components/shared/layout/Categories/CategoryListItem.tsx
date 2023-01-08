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
		[name],
	);

	return (
		<li className="ml-2 text-lg decoration-teal-400 decoration-2 underline-offset-[3px] hover:underline">
			<Link href={`/c/${slug}`}>{formattedName}</Link>
		</li>
	);
};
