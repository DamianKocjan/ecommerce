import { useFilter } from "@/features/filter";
import React from "react";
import { Filter } from "../Filter";

const OPTIONS = [
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
	const filter = useFilter();

	return (
		<Filter
			label="Order by"
			filterKey="sortBy"
			options={OPTIONS}
			selected={[filter.filters.sortBy || "popularity"]}
		/>
	);
};
