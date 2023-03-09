import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { NextPageWithLayout } from "../../pages/_app";
import { trpc } from "../../utils/trpc";
import { EmptyState } from "../shared/core/EmptyState";
import { Flex } from "../shared/core/Flex";
import { useMediaQuery } from "../shared/hooks/useMediaQuery";
import { useFilter } from "../shared/layout/Products/Filter/store";
import { Filters } from "../shared/layout/Products/Filters";
import { ProductsList } from "../shared/layout/Products/List";
import { ListFooter } from "../shared/layout/Products/ListFooter";
import { usePage } from "../shared/layout/Products/ListFooter/usePage";
import { usePerPage } from "../shared/layout/Products/ListFooter/usePerPage";
import { Container } from "../shared/layout/ShopLayout/Container";

const Categories = dynamic(
	() => import("../shared/layout/Categories").then((mod) => mod.Categories),
	{
		ssr: false,
	},
);

export const Category: NextPageWithLayout<{ previousUrl?: string }> = ({
	previousUrl,
}) => {
	const router = useRouter();
	const category = router.query["slug"] as string;
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
		},
	);

	const isMediumScreen = useMediaQuery("md");

	return (
		<Container title="Products">
			<Flex className="gap-4 py-4 px-2 sm:px-0">
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
