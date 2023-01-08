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

export const BrandFilter: React.FC = () => {
	const brands = trpc.brand.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("brands", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.brands;

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
						brands: `[${(val as string[]).join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[setFilter, router],
	);

	useEffect(() => {
		const brands = router.query["brands"] as string;
		if (brands && brands.includes("[") && brands.includes("]")) {
			setFilter(
				"brands",
				brands
					.slice(1, -1)
					.split(".")
					.map((b) => Number(b))
					.filter((b) => b !== 0),
			);
		}
	}, [router.query, setFilter]);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.brands || []}
			multiple
		>
			<FilterListBoxButton label="Brand" />
			<FilterListboxOptions>
				{brands.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					brands.data?.map((brand) => (
						<FilterListboxOption
							key={brand.key}
							label={brand.value}
							value={brand.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
