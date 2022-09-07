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

export const BrandFilter: React.FC = () => {
	const brands = trpc.useQuery(["brands"], { refetchOnWindowFocus: false });
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("brands", val);
		},
		[setFilter]
	);

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
