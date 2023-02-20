import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

import { useFilter } from "../../features/filter";
import { NextPageWithLayout } from "../../pages/_app";
import { trpc } from "../../utils/trpc";
import { EmptyState } from "../shared/core/EmptyState";
import { Flex } from "../shared/core/Flex";
import { Categories } from "../shared/layout/Categories";
import { Filters } from "../shared/layout/Products/Filters";
import { ProductsList } from "../shared/layout/Products/List";
import { ListFooter } from "../shared/layout/Products/ListFooter";
import { usePerPage } from "../shared/layout/Products/ListFooter/usePerPage";
import { Container } from "../shared/layout/ShopLayout/Container";

export const Category: NextPageWithLayout<{ previousUrl?: string }> = ({
	previousUrl,
}) => {
	const router = useRouter();
	const category = router.query["slug"] as string;
	const query = router.query["q"] as string;
	const queryPage = router.query["page"] as string;

	const [perPage, handlePerPageChange] = usePerPage();
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

	return (
		<Container title="Products">
			<Flex className="gap-4 py-4">
				<Categories parentCategory={category} previousUrl={previousUrl} />
				<div className="w-3/4">
					<Filters />
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
								setPage={handleSetPage}
								currentPage={products.data?.meta.currentPage}
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
