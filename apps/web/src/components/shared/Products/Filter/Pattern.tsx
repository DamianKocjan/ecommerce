import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
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
	const router = useRouter();

	// TODO: type this
	const handleChange = useCallback(
		(val: unknown) => {
			setFilter("patterns", val);

			if ((val as string[]).length === 0) {
				const query = { ...router.query };
				delete query.patterns;

				router.push(
					{
						query,
					},
					undefined,
					{ shallow: true }
				);
				return;
			}

			router.push(
				{
					query: {
						...router.query,
						patterns: `[${(val as string[]).join(".")}]`,
					},
				},
				undefined,
				{ shallow: true }
			);
		},
		[setFilter, router]
	);

	useEffect(() => {
		const patterns = router.query["patterns"] as string;
		if (patterns && patterns.includes("[") && patterns.includes("]")) {
			setFilter(
				"patterns",
				patterns
					.slice(1, -1)
					.split(".")
					.map((p) => Number(p))
					.filter((p) => p !== 0)
			);
		}
	}, [router.query]);

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
