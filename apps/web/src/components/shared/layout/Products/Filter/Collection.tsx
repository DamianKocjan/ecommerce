import { Combobox } from "@headlessui/react";
import { List } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../../../utils/trpc";
import { FilterComboboxOption } from "./Combobox/Option";
import { cacheTime } from "./constants";
import { useFilter } from "./store";

export const CollectionFilter: React.FC = () => {
	const collections = trpc.collection.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
		cacheTime,
	});
	const [query, setQuery] = useState("");
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	const filteredCollections = useMemo(
		() =>
			query === ""
				? collections.data
				: collections.data?.filter((collection) =>
						collection.value.toLowerCase().includes(query.toLowerCase()),
				  ),
		[collections.data, query],
	);

	const updateCollectionFilter = useCallback(
		(collectionType: number) => {
			setFilter("collectionType", collectionType);
			void router.push(
				{
					query: {
						...router.query,
						collectionType,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[setFilter, router],
	);

	useEffect(() => {
		const collectionType = router.query["collectionType"];
		if (collectionType) {
			setFilter("collectionType", collectionType);
		}
	}, [router.query, setFilter]);

	const disabled =
		collections.isLoading || !collections.data || !collections.data.length;

	return (
		<Combobox
			as="div"
			value={filters.collectionType}
			onChange={updateCollectionFilter}
			disabled={disabled}
		>
			<Combobox.Label className="block text-sm font-medium text-gray-700">
				Collections
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full border border-black bg-white py-2 pl-3 pr-10 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:cursor-not-allowed sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(selected: number) =>
						collections.data?.find((c) => c.key === selected)?.value ?? ""
					}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
					<List className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				{(filteredCollections?.length ?? 0) > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredCollections?.map((collection) => (
							<FilterComboboxOption
								key={collection.key}
								value={collection.key}
								displayName={collection.value}
							/>
						))}
					</Combobox.Options>
				)}
			</div>
		</Combobox>
	);
};
