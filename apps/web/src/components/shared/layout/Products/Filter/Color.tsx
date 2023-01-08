import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

import { useFilter } from "../../../../../features/filter";
import { trpc } from "../../../../../utils/trpc";
import {
	FilterListbox,
	FilterListBoxButton,
	FilterListboxOption,
	FilterListboxOptions,
	FilterListboxOptionsLoader,
} from "./Listbox";

export const ColorFilter: React.FC = () => {
	const colors = trpc.color.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});
	const { filters, setFilter } = useFilter();
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("colors", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.colors;

				router.push(
					{
						query,
					},
					undefined,
					{ shallow: true },
				);
				return;
			}

			router.push(
				{
					query: {
						...router.query,
						colors: `[${(val as string[]).join(".")}]`,
					},
				},
				undefined,
				{ shallow: true },
			);
		},
		[setFilter, router],
	);

	useEffect(() => {
		const colors = router.query["colors"] as string;
		if (colors && colors.includes("[") && colors.includes("]")) {
			setFilter(
				"colors",
				colors
					.slice(1, -1)
					.split(".")
					.map((c) => Number(c))
					.filter((c) => c !== 0),
			);
		}
	}, [router.query, setFilter]);

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
