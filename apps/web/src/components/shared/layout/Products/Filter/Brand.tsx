import { Combobox } from "@headlessui/react";
import { useRouter } from "next/router";
import { List } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../../../utils/trpc";
import { FilterComboboxOption } from "./Combobox/Option";
import { cacheTime } from "./constants";
import { useFilter } from "./store";

export const BrandFilter: React.FC = () => {
	const brands = trpc.brand.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
		cacheTime,
	});
	const [query, setQuery] = useState("");
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	const filteredBrands = useMemo(
		() =>
			query === ""
				? brands.data
				: brands.data?.filter((brand) =>
						brand.value.toLowerCase().includes(query.toLowerCase()),
				  ),
		[brands.data, query],
	);

	const updateBrandFilter = useCallback(
		(brands: number[]) => {
			setFilter("brands", brands);

			if (brands.length === 0) {
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
						brands: `[${brands.join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[router, setFilter],
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

	const disabled = brands.isLoading || !brands.data || !brands.data.length;

	return (
		<Combobox
			as="div"
			value={filters.brands}
			onChange={updateBrandFilter}
			disabled={disabled}
			multiple
		>
			<Combobox.Label className="block text-sm font-medium text-gray-700">
				Brands
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full border border-black bg-white py-2 pl-3 pr-10 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(selected: number[]) =>
						selected
							?.map((brand) => brands.data?.find((b) => b.key === brand)?.value)
							.join(", ") ?? ""
					}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
					<List className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{(filteredBrands?.length ?? 0) > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredBrands?.map((brand) => (
							<FilterComboboxOption
								key={brand.key}
								value={brand.key}
								displayName={brand.value}
							/>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};
