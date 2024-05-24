import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { FilterListbox } from "./Listbox";

const OPTIONS = [
	{
		key: "ALL",
		value: "All",
	},
	{
		key: "SPRING",
		value: "Spring",
	},
	{
		key: "SUMMER",
		value: "Summer",
	},
	{
		key: "AUTUMN",
		value: "Autumn",
	},
	{
		key: "WINTER",
		value: "Winter",
	},
] as const;

export const SeasonFilter: React.FC = () => {
	const router = useRouter();
	const season = (router.query.season as string) || "ALL";

	const handleChange = useCallback(
		(val: string) => {
			void router.push(
				{
					query: {
						...router.query,
						season: val,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[router],
	);

	return (
		<FilterListbox onChange={handleChange} value={season}>
			<FilterListbox.Button label="Season" />
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
