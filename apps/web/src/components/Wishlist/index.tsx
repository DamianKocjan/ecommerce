import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

import { useFilter } from "../../features/filter";
import { NextPageWithLayout } from "../../pages/_app";
import { trpc } from "../../utils/trpc";
import { Container } from "../shared/core/Container";
import { EmptyState } from "../shared/core/EmptyState";
import { PrettyContainer } from "../shared/core/PrettyContainer";
import { Filters } from "../shared/layout/Products/Filters";
import { ProductsList } from "../shared/layout/Products/List";
import { ListFooter } from "../shared/layout/Products/ListFooter";
import { PER_PAGE } from "../shared/layout/Products/ListFooter/PerPage";

export const Wishlist: NextPageWithLayout = () => {
	const router = useRouter();
	const query = router.query["q"] as string;
	const queryPage = router.query["page"] as string;

	const [perPage, setPerPage] = useState(
		typeof window !== "undefined"
			? Number(window.localStorage.getItem("perPage")) || PER_PAGE[0]!
			: PER_PAGE[0]!,
	);
	const [page, setPage] = useState<number | undefined>(
		queryPage ? parseInt(queryPage, 10) : undefined,
	);

	const handleSetPage = useCallback(
		(page: number | undefined) => {
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

	const handlePerPageChange = useCallback((value: number) => {
		setPerPage(value);
		window.localStorage.setItem("perPage", value.toString());
	}, []);

	const filters = useFilter((state) => state.filters);

	const parsedFilters = useMemo(() => {
		const parsed: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(filters)) {
			const isValid = Array.isArray(value) ? value.length > 0 : value;
			if (isValid) {
				parsed[key] = value;
			}
		}
		return parsed;
	}, [filters]);

	const wishlisted = trpc.wishlist.all.useQuery(
		{
			q: query,
			perPage,
			page,
			...parsedFilters,
		},
		{
			refetchOnWindowFocus: false,
		},
	);

	return (
		<Container title="Your wishlist">
			<PrettyContainer className="mt-4">
				<h1 className="text-3xl">Your wishlist</h1>
			</PrettyContainer>
			<div className="my-2 mx-4">
				<Filters />
				{!wishlisted.isLoading && wishlisted.data?.data.length === 0 ? (
					<EmptyState
						title="No wishlisted products found"
						description="Wishlist some products and they will appear there!"
					/>
				) : (
					<>
						<ProductsList
							isLoading={wishlisted.isLoading}
							products={wishlisted.data?.data.map(
								(wishlisted) => wishlisted.product,
							)}
						/>
						<ListFooter
							handlePerPageChange={handlePerPageChange}
							perPage={perPage}
							setPage={handleSetPage}
							currentPage={wishlisted.data?.meta.currentPage}
							nextPage={wishlisted.data?.meta.next}
							previousPage={wishlisted.data?.meta.prev}
						/>
					</>
				)}
			</div>
		</Container>
	);
};
