import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { EmptyState } from "~/components/shared/core/EmptyState";
import { Flex } from "~/components/shared/core/Flex";
import { useMediaQuery } from "~/components/shared/hooks/useMediaQuery";
import { ProductsList } from "~/components/shared/layout/Products/List";
import { ListFooter } from "~/components/shared/layout/Products/ListFooter";
import { usePage } from "~/components/shared/layout/Products/ListFooter/usePage";
import { usePerPage } from "~/components/shared/layout/Products/ListFooter/usePerPage";
import { Container } from "~/components/shared/layout/ShopLayout/Container";
import { NextPageWithLayout } from "~/pages/_app";
import { trpc } from "~/utils/trpc";
import { useFilters } from "../shared/layout/Products/Filter/useFilters";
import { Filters } from "../shared/layout/Products/Filters";

const Categories = dynamic(
	() =>
		import("~/components/shared/layout/Categories").then(
			(mod) => mod.Categories,
		),
	{
		ssr: false,
	},
);

export const Catalog: NextPageWithLayout<{ previousUrl?: string }> = ({
	previousUrl,
}) => {
	const router = useRouter();

	const [perPage, handlePerPageChange] = usePerPage();
	const [page, setPage] = usePage();

	const parsedFilters = useFilters();

	const products = trpc.product.all.useQuery(
		{
			perPage,
			page,
			...parsedFilters,
		},
		{
			refetchOnWindowFocus: false,
			onSuccess(data) {
				const lastPage = data.meta.lastPage;
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

	const isMediumScreen = useMediaQuery("md");

	return (
		<Container title="Products">
			<Flex className="gap-4 px-2 py-4 sm:px-0">
				{isMediumScreen && <Categories previousUrl={previousUrl} />}
				<div className="w-full md:w-3/4">
					<Filters
						parentCategory={router.query["slug"] as string | undefined}
						previousUrl={previousUrl}
						filters={productFilters.data}
					/>

					{!products.isLoading && products.data?.data.length === 0 ? (
						<EmptyState
							title="No products found"
							description="Please try another search or browse the categories."
						/>
					) : (
						<>
							<ProductsList
								isLoading={products.isLoading}
								products={products.data?.data}
							/>
							<ListFooter
								handlePerPageChange={handlePerPageChange}
								perPage={perPage}
								setPage={setPage}
								currentPage={page}
								nextPage={products.data?.meta.next}
								previousPage={products.data?.meta.prev}
							/>
						</>
					)}
				</div>
			</Flex>
		</Container>
	);
};
