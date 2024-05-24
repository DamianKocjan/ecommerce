import { useRouter } from "next/router";
import { useMemo } from "react";

export function useFilters() {
	const { query } = useRouter();

	const filters = useMemo(() => {
		let obj = {
			category: query.slug,
			page: query.page,
			q: query.q,
			sortBy: query.sortBy,
		} as Record<number | string, string>;

		for (const key in query) {
			if (!isNaN(Number(key))) {
				obj[Number(key)] = query[key] as string;
			}
		}
		return parseFilters(obj);
	}, [query]);

	return filters;
}

type FilterValue = number | string | number[] | string[];
type Filter = Record<number | string, FilterValue>;

function parseFilters(obj: Record<number | string, string>): Filter {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		if (value === undefined) {
			return acc;
		}
		if (value.startsWith("[") && value.endsWith("]")) {
			acc[key] = value
				.slice(1, -1)
				.split(".")
				.map((item) => {
					if (!isNaN(Number(item))) {
						return Number(item);
					}
					return undefined;
				})
				.filter(Boolean) as number[];
		} else if (!isNaN(Number(value)) && value !== "") {
			acc[key] = Number(value);
		} else {
			acc[key] = value;
		}
		return acc;
	}, {} as Filter);
}
