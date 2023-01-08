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

export const CollectionFilter: React.FC = () => {
	const collections = trpc.collection.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("collectionType", val);
			void router.push(
				{
					query: {
						...router.query,
						collectionType: val as string,
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

	return (
		<FilterListbox onChange={handleChange} value={filters?.collectionType}>
			<FilterListBoxButton label="Collection" />
			<FilterListboxOptions>
				{collections.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					collections.data?.map((collection) => (
						<FilterListboxOption
							key={collection.key}
							label={collection.value}
							value={collection.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
