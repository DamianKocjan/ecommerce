import { EmptyState } from "~/components/shared/core/EmptyState";
import { PrettyContainer } from "~/components/shared/core/PrettyContainer";
import { Filters } from "~/components/shared/layout/Products/Filters";
import { ProductsList } from "~/components/shared/layout/Products/List";
import { ListFooter } from "~/components/shared/layout/Products/ListFooter";
import { usePage } from "~/components/shared/layout/Products/ListFooter/usePage";
import { usePerPage } from "~/components/shared/layout/Products/ListFooter/usePerPage";
import { Container } from "~/components/shared/layout/ShopLayout/Container";
import { NextPageWithLayout } from "~/pages/_app";
import { trpc } from "~/utils/trpc";
import { useFilters } from "../shared/layout/Products/Filter/useFilters";

export const Wishlist: NextPageWithLayout = () => {
	const [perPage, handlePerPageChange] = usePerPage();
	const [page, setPage] = usePage();

	const parsedFilters = useFilters();

	const context = trpc.useContext();
	const wishlisted = trpc.wishlist.all.useQuery(
		{
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
	const productFilters = trpc.filters.products.useQuery(
		{
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
			<div className="mx-4 my-2">
				<Filters hideCategories filters={productFilters.data} />

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
