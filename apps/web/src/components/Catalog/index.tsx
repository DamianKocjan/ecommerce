import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { EmptyState } from "~/components/shared/core/EmptyState";
import { Flex } from "~/components/shared/core/Flex";
import { useMediaQuery } from "~/components/shared/hooks/useMediaQuery";
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
	const category = router.query["slug"] as string;
	const query = router.query["q"] as string;

	const [perPage, handlePerPageChange] = usePerPage();
	const [page, setPage] = usePage();

	const filters = useFilter((state) => state.filters);
	const parsedFilters = useParsedFilters(filters);

	const products = trpc.product.all.useQuery(
		{
			category: category,
			q: query,
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

	const isMediumScreen = useMediaQuery("md");

	return (
		<Container title="Products">
			<Flex className="gap-4 px-2 py-4 sm:px-0">
				{isMediumScreen && (
					<Categories parentCategory={category} previousUrl={previousUrl} />
				)}
				<div className="w-full md:w-3/4">
					<Filters parentCategory={category} previousUrl={previousUrl} />
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
