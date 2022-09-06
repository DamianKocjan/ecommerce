import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
	FilterListboxOptionsLoader,
} from "./Listbox";

export const SizeFilter: React.FC = () => {
	const router = useRouter();
	const slug = router.query["slug"] as string;
	const sizes = trpc.useQuery(
		[
			"sizes",
			{
				category: slug || null,
			},
		],
		{ refetchOnWindowFocus: false }
	);
	const { filters, setFilter } = useFilter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("size", val);
		},
		[setFilter]
	);

	return (
		<FilterListbox onChange={handleChange} value={filters?.size || []} multiple>
			<FilterListBoxButton label="Size" />
			<FilterListboxOptions>
				{sizes.isLoading ? (
					<FilterListboxOptionsLoader />
				) : (
					sizes.data?.map((size) => (
						<FilterListboxOption
							key={size.key}
							label={size.value}
							value={size.key}
						/>
					))
				)}
			</FilterListboxOptions>
		</FilterListbox>
	);
};
