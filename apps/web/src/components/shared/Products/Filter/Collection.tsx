import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import React, { useCallback } from "react";
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

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("collectionType", val);
		},
		[setFilter]
	);

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
