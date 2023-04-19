import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

import { trpc } from "../../../../../utils/trpc";
import { cacheTime } from "./constants";
import { FilterListbox } from "./Listbox";
import { useFilter } from "./store";

export const SizeFilter: React.FC = () => {
	const router = useRouter();
	const slug = router.query["slug"] as string;
	const sizes = trpc.size.all.useQuery(
		{
			category: slug,
		},
		{ refetchOnWindowFocus: false, cacheTime },
	);
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("sizes", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.sizes;

				void router.push(
					{
						query,
					},
					undefined,
					{ shallow: true },
				);
				return;
			}

			void router.push(
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
			<FilterListbox.Button label="Sizes" />
			<FilterListbox.Options>
				{sizes.isLoading ? (
					<FilterListbox.OptionsLoader />
				) : (
					sizes.data?.map((size) => (
						<FilterListbox.Option
							key={size.key}
							label={size.value}
							value={size.key}
						/>
					))
				)}
			</FilterListbox.Options>
		</FilterListbox>
	);
};
