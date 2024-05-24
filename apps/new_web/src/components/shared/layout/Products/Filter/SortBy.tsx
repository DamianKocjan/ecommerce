import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { FilterListbox } from "./Listbox";

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
] as const;

export const SortByFilter: React.FC = () => {
	const router = useRouter();
	const sortBy = (router.query.sortBy as string) || "popularity";

	const handleChange = useCallback(
		(val: string) => {
			void router.push(
				{
					query: {
						...router.query,
						sortBy: val,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[router],
	);

	return (
		<FilterListbox onChange={handleChange} value={sortBy}>
			<FilterListbox.Button label="Order by" />
			<FilterListbox.Options>
				{OPTIONS.map((option) => (
					<FilterListbox.Option
						key={option.key}
						label={option.value}
						value={option.key}
					/>
				))}
			</FilterListbox.Options>
		</FilterListbox>
	);
};
