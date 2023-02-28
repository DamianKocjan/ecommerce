import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft as ArrowLeftIcon, Spinner } from "phosphor-react";
import React, { useMemo } from "react";

import { trpc } from "../../../../utils/trpc";
import { Flex } from "../../core/Flex";
import { Heading } from "../../core/Heading";
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
		if (!previousUrl || previousUrl === router.asPath) {
			return;
		}

		if (previousUrl.includes("/c/")) {
			const slug = previousUrl.split("/c/")[1];
			if (slug?.includes("?q=")) {
				return slug?.split("?q=")[0];
			}
			return slug;
		}
	}, [previousUrl, router]);

	const categories = trpc.category.all.useQuery(
		{
			category: parentCategory,
			parentCategory: previousCategorySlug,
		},
		{
			refetchOnWindowFocus: false,
		},
	);

	if (categories.isLoading) {
		return (
			<div className="w-1/4">
				<Heading className="text-3xl">Categories</Heading>
				<Flex className="my-4 ml-2 w-full">
					<Spinner className="text-teal-500" />
					Loading categories...
				</Flex>
			</div>
		);
	}

	return (
		<div className="w-1/4">
			<Heading className="text-3xl">Categories</Heading>
			<ul className="my-4 mx-2">
				{previousCategorySlug !== null && categories.data?.parentCategory && (
					<li className="text-xl font-semibold text-neutral-500 decoration-teal-400 decoration-2 underline-offset-[3px] hover:text-black hover:underline">
						<Link href={`/c/${categories.data.parentCategory.slug}`}>
							<Flex items="center">
								<ArrowLeftIcon className="mr-2 h-5 w-5" />
								{categories.data.parentCategory.name}
							</Flex>
						</Link>
					</li>
				)}
				{categories.data?.category && (
					<li className="text-xl font-semibold decoration-teal-400 decoration-2 underline-offset-[3px] hover:underline">
						<Link href={`/c/${categories.data.category.slug}`}>
							{categories.data.category.name}
						</Link>
					</li>
				)}
				{categories.data?.categories.map(({ name, slug }) => (
					<CategoryListItem
						key={`subcategory-${slug}`}
						name={name}
						slug={slug}
					/>
				))}
			</ul>
		</div>
	);
};
