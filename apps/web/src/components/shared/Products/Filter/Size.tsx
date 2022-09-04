import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React from "react";
import { Filter } from "../Filter";

export const SizeFilter: React.FC = () => {
	const router = useRouter();
	const slug = router.query["slug"] as string;
	const sizes = trpc.useQuery(
		[
			"sizes",
			{
				category: slug || null,
			},
		],
		{ refetchOnWindowFocus: false }
	);
	const filter = useFilter();

	// console.log(sizes.data, filter.filters.size?.[0], sizes.data?.[0]?.key);

	return sizes.isLoading ? (
		<Filter
			label="Size"
			filterKey="size"
			options={[]}
			selected={filter.filters.size?.[0] ? [filter.filters.size?.[0]] : []}
			showSelectedOption
			multiSelect
		/>
	) : (
		<Filter
			label="Size"
			filterKey="size"
			options={sizes.data || []}
			selected={filter.filters.size?.[0] ? [filter.filters.size?.[0]] : []}
			// showSelectedOption
			multiSelect
		/>
	);
};
