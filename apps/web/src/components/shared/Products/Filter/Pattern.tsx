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

export const PatternFilter: React.FC = () => {
	const patterns = trpc.useQuery(["patterns"], {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("patterns", val);
		},
		[setFilter]
	);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.patterns || []}
			multiple
		>
			<FilterListBoxButton label="Pattern" />
			<FilterListboxOptions>
				{patterns.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					patterns.data?.map((pattern) => (
						<FilterListboxOption
							key={pattern.key}
							label={pattern.value}
							value={pattern.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
