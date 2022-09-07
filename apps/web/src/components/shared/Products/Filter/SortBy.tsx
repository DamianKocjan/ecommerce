import { SortBy, useFilter } from "@/features/filter";
import React, { useCallback } from "react";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
} from "./Listbox";

const OPTIONS: {
	key: SortBy;
	value: string;
}[] = [
	{
		key: "popularity",
		value: "Popularity",
	},
	{
		key: "priceLowToHigh",
		value: "Price low to high",
	},
	{
		key: "priceHighToLow",
		value: "Price high to low",
	},
	{
		key: "sales",
		value: "Sales",
	},
];

export const SortByFilter: React.FC = () => {
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("sortBy", val);
		},
		[setFilter]
	);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.sortBy || "popularity"}
		>
			<FilterListBoxButton label="Order by" />
			<FilterListboxOptions>
				{OPTIONS.map((option) => (
					<FilterListboxOption
						key={option.key}
						label={option.value}
						value={option.key}
					/>
				))}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
