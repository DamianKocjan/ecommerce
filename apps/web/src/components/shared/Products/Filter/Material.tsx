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

export const MaterialFilter: React.FC = () => {
	const materials = trpc.useQuery(["materials"], {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("materials", val);
		},
		[setFilter]
	);

	return (
		<FilterListbox
			onChange={handleChange}
			value={filters?.materials || []}
			multiple
		>
			<FilterListBoxButton label="Material" />
			<FilterListboxOptions>
				{materials.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					materials.data?.map((material) => (
						<FilterListboxOption
							key={material.key}
							label={material.value}
							value={material.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
