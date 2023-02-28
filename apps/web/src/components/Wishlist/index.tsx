import { useRouter } from "next/router";
import { useMemo } from "react";

import { NextPageWithLayout } from "../../pages/_app";
import { trpc } from "../../utils/trpc";
import { EmptyState } from "../shared/core/EmptyState";
import { PrettyContainer } from "../shared/core/PrettyContainer";
import { useFilter } from "../shared/layout/Products/Filter/store";
import { Filters } from "../shared/layout/Products/Filters";
import { ProductsList } from "../shared/layout/Products/List";
import { ListFooter } from "../shared/layout/Products/ListFooter";
import { usePage } from "../shared/layout/Products/ListFooter/usePage";
import { usePerPage } from "../shared/layout/Products/ListFooter/usePerPage";
import { Container } from "../shared/layout/ShopLayout/Container";

export const Wishlist: NextPageWithLayout = () => {
	const router = useRouter();
	const query = router.query["q"] as string;

	const [perPage, handlePerPageChange] = usePerPage();
	const [page, setPage] = usePage();

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

	const context = trpc.useContext();
	const wishlisted = trpc.wishlist.all.useQuery(
		{
			q: query,
			perPage,
			page,
			...parsedFilters,
		},
		{
			refetchOnWindowFocus: false,
			onSuccess({ data }) {
				data.map(({ id, product: { id: productId } }) => {
					context.wishlist.isIn.setData(
						{
							productId,
						},
						id,
					);
				});
			},
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
							setPage={setPage}
							currentPage={page}
							nextPage={wishlisted.data?.meta.next}
							previousPage={wishlisted.data?.meta.prev}
						/>
					</>
				)}
			</div>
		</Container>
	);
};
