import { useRouter } from "next/router";

import { EmptyState } from "~/components/shared/core/EmptyState";
import { PrettyContainer } from "~/components/shared/core/PrettyContainer";
import {
	useFilter,
	useParsedFilters,
} from "~/components/shared/layout/Products/Filter/store";
import { Filters } from "~/components/shared/layout/Products/Filters";
import { ProductsList } from "~/components/shared/layout/Products/List";
import { ListFooter } from "~/components/shared/layout/Products/ListFooter";
import { usePage } from "~/components/shared/layout/Products/ListFooter/usePage";
import { usePerPage } from "~/components/shared/layout/Products/ListFooter/usePerPage";
import { Container } from "~/components/shared/layout/ShopLayout/Container";
import { NextPageWithLayout } from "~/pages/_app";
import { trpc } from "~/utils/trpc";

export const Wishlist: NextPageWithLayout = () => {
	const router = useRouter();
	const query = router.query["q"] as string;

	const [perPage, handlePerPageChange] = usePerPage();
	const [page, setPage] = usePage();

	const filters = useFilter((state) => state.filters);
	const parsedFilters = useParsedFilters(filters);

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
			onSuccess({ data, meta }) {
				data.map(({ id, product: { id: productId } }) => {
					context.wishlist.isIn.setData(
						{
							productId,
						},
						id,
					);
				});

				const lastPage = meta.lastPage;
				if (lastPage < page) {
					setPage(lastPage);
				}
			},
		},
	);

	return (
		<Container title="Your wishlist">
			<PrettyContainer className="mt-4">
				<h1 className="text-3xl">Your wishlist</h1>
			</PrettyContainer>
			<div className="mx-4 my-2">
				<Filters hideCategories />
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
