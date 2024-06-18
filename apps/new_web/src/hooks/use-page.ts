import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function usePage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const queryPage = searchParams.get("page");

	const page = React.useMemo(
		() => (queryPage ? parseInt(queryPage, 10) : 1),
		[queryPage],
	);

	const handleSetPage = React.useCallback(
		(page = 1) => {
			const query = {} as Record<string, string>;
			searchParams.forEach((value, key) => {
				query[key] = value;
			});
			query["page"] = page.toString();
			const search = new URLSearchParams(query).toString();
			const url = `${window.location.pathname}?${search}`;

			router.push(url);
		},
		[router, searchParams],
	);

	return [page, handleSetPage] as const;
}
