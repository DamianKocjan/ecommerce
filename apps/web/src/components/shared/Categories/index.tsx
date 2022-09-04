import { trpc } from "@/utils/trpc";
import { Heading, Spinner } from "@ecommerce/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft as ArrowLeftIcon } from "phosphor-react";
import { useMemo } from "react";
import { CategoryListItem } from "./CategoryListItem";

export interface CategoriesProps {
	parentCategory?: string;
	previousUrl?: string;
}

export const Categories: React.FC<CategoriesProps> = ({
	parentCategory,
	previousUrl,
}) => {
	const router = useRouter();

	const previousCategorySlug = useMemo(() => {
		if (!previousUrl) {
			return null;
		}

		if (previousUrl === router.asPath) {
			return null;
		}

		if (previousUrl.includes("/c/")) {
			const slug = previousUrl.split("/c/")[1];
			if (slug.includes("?q=")) {
				return slug.split("?q=")[0];
			}
			return previousUrl.split("/c/")[1];
		}
		return null;
	}, [previousUrl, router]);

	const categories = trpc.useQuery(
		[
			"categories",
			{
				category: parentCategory,
				parentCategory: previousCategorySlug,
			},
		],
		{
			refetchOnWindowFocus: false,
		}
	);

	if (categories.isLoading) {
		return (
			<div className="w-1/4">
				<Heading className="text-3xl">Categories</Heading>
				<div className="flex w-full my-4 ml-2">
					<Spinner className="text-teal-500" />
					Loading categories...
				</div>
			</div>
		);
	}

	return (
		<div className="w-1/4">
			<Heading className="text-3xl">Categories</Heading>
			<ul className="my-4 mx-2">
				{previousCategorySlug !== null && categories.data?.parentCategory && (
					<li className="text-xl text-neutral-500 font-semibold hover:text-black hover:underline underline-offset-[3px] decoration-teal-400 decoration-2">
						<Link href={`/c/${categories.data.parentCategory.slug}`}>
							<a className="flex items-center">
								<ArrowLeftIcon className="w-5 h-5 mr-2" />
								{categories.data.parentCategory.name}
							</a>
						</Link>
					</li>
				)}
				{categories.data?.category && (
					<li className="text-xl font-semibold hover:underline underline-offset-[3px] decoration-teal-400 decoration-2">
						<Link href={`/c/${categories.data.category.slug}`}>
							{categories.data.category.name}
						</Link>
					</li>
				)}
				{categories.data?.categories.map((category) => (
					<CategoryListItem key={category.slug} category={category} />
				))}
			</ul>
		</div>
	);
};
