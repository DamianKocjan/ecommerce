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

export const CutFilter: React.FC = () => {
	const cuts = trpc.useQuery(["cuts"], {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("cuts", val);
		},
		[setFilter]
	);

	return (
		<FilterListbox onChange={handleChange} value={filters?.cuts || []} multiple>
			<FilterListBoxButton label="Cut" />
			<FilterListboxOptions>
				{cuts.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					cuts.data?.map((cut) => (
						<FilterListboxOption
							key={cut.key}
							label={cut.value}
							value={cut.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
