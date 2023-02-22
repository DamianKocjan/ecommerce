import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export function usePage() {
	const router = useRouter();
	const queryPage = router.query["page"] as string | undefined;

	const [page, setPage] = useState(queryPage ? parseInt(queryPage, 10) : 1);

	const handleSetPage = useCallback(
		(page = 1) => {
			setPage(page);
			void router.push(
				{
					query: { ...router.query, page },
				},
				undefined,
				{ shallow: true },
			);
		},
		[router],
	);

	return [page, handleSetPage] as const;
}
