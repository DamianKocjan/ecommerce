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

export const ColorFilter: React.FC = () => {
	const colors = trpc.useQuery(["colors"], { refetchOnWindowFocus: false });
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("colors", val);
		},
		[setFilter]
	);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.colors || []}
			multiple
		>
			<FilterListBoxButton label="Color" />
			<FilterListboxOptions>
				{colors.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					colors.data?.map((color) => (
						<FilterListboxOption
							key={color.key}
							label={color.value}
							value={color.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
