import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export function usePage() {
	const router = useRouter();
	const queryPage = router.query["page"] as string | undefined;

	const page = useMemo(
		() => (queryPage ? parseInt(queryPage, 10) : 1),
		[queryPage],
	);

	const handleSetPage = useCallback(
		(page = 1) => {
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
