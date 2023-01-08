import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

import { useFilter } from "../../../../../features/filter";
import { trpc } from "../../../../../utils/trpc";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
	FilterListboxOptionsLoader,
} from "./Listbox";

export const SizeFilter: React.FC = () => {
	const router = useRouter();
	const slug = router.query["slug"] as string;
	const sizes = trpc.size.all.useQuery(
		{
			category: slug,
		},
		{ refetchOnWindowFocus: false },
	);
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("sizes", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.sizes;

				router.push(
					{
						query,
					},
					undefined,
					{ shallow: true },
				);
				return;
			}

			router.push(
				{
					query: {
						...router.query,
						sizes: `[${(val as string[]).join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[setFilter, router],
	);

	useEffect(() => {
		const sizes = router.query["sizes"] as string;
		if (sizes && sizes.includes("[") && sizes.includes("]")) {
			setFilter(
				"sizes",
				sizes
					.slice(1, -1)
					.split(".")
					.map((s) => Number(s))
					.filter((s) => s !== 0),
			);
		}
	}, [router.query, setFilter]);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.sizes || []}
			multiple
		>
			<FilterListBoxButton label="Size" />
			<FilterListboxOptions>
				{sizes.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					sizes.data?.map((size) => (
						<FilterListboxOption
							key={size.key}
							label={size.value}
							value={size.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
