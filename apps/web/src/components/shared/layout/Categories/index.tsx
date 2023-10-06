import {
	ArrowLeft as ArrowLeftIcon,
	WarningCircle as WarningCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { Flex } from "~/components/shared/core/Flex";
import { Heading } from "~/components/shared/core/Heading";
import { Spinner } from "~/components/shared/core/Spinner";
import { trpc } from "~/utils/trpc";
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
				<Flex items="center" className="my-4 ml-2 text-slate-700">
					<Spinner className="text-teal-500" />
					Loading categories...
				</Flex>
			</div>
		);
	} else if (categories.isError) {
		return (
			<div className="w-1/4">
				<Heading className="text-3xl">Categories</Heading>
				<Flex className="my-4 ml-2 gap-4 px-2 py-4 text-slate-700 outline outline-black">
					<WarningCircleIcon className="h-8 w-8 text-red-500" />
					<Flex direction="col">
						<h4 className="text-bold text-sm text-red-500">
							An error occurred!
						</h4>
						<p className="text-xs">
							{categories.error?.message ?? "Unknown error"}
						</p>
					</Flex>
				</Flex>
			</div>
		);
	}
	return (
		<div className="w-1/4">
			<Heading className="text-3xl">Categories</Heading>
			<ul className="mx-2 my-4">
				{previousCategorySlug !== null && categories.data?.parentCategory && (
					<li className="text-xl font-semibold text-neutral-500 decoration-teal-400 decoration-2 underline-offset-[3px] hover:text-black hover:underline">
						<Link href={`/c/${categories.data.parentCategory.slug}`}>
							<Flex items="center" className="gap-2">
								<ArrowLeftIcon className="h-5 w-5" />
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
