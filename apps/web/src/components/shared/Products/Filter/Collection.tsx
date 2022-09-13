import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
	FilterListboxOptionsLoader,
} from "./Listbox";

export const CollectionFilter: React.FC = () => {
	const collections = trpc.useQuery(["collections"], {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("collectionType", val);
			router.push(
				{
					query: {
						...router.query,
						collectionType: val as string,
					},
				},
				undefined,
				{ shallow: true }
			);
		},
		[setFilter, router]
	);

	useEffect(() => {
		const collectionType = router.query["collectionType"];
		if (collectionType) {
			setFilter("collectionType", collectionType);
		}
	}, [router.query]);

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
