import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { EmptyState, Flex } from "@ecommerce/ui";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { Categories } from "../shared/Categories";
import { Container } from "../shared/Container";
import { Filters } from "../shared/Products/Filters";
import { ProductsList } from "../shared/Products/List";
import { ListFooter } from "../shared/Products/ListFooter";
import { PER_PAGE } from "../shared/Products/ListFooter/PerPage";

export function Category({ previousUrl }: { previousUrl: string }) {
	const router = useRouter();
	const category = router.query["slug"] as string;
	const query = router.query["q"] as string;
	const queryPage = router.query["page"] as string;

	const [perPage, setPerPage] = useState(
		typeof window !== "undefined"
			? Number(window.localStorage.getItem("perPage")) || PER_PAGE[0]
			: PER_PAGE[0]
	);
	const [page, setPage] = useState<number | undefined>(
		queryPage ? parseInt(queryPage as string, 10) : undefined
	);

	const handleSetPage = useCallback(
		(page: number | undefined) => {
			setPage(page);
			router.push(
				{
					query: { ...router.query, page },
				},
				undefined,
				{ shallow: true }
			);
		},
		[router]
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

	const products = trpc.useQuery(
		[
			"products",
			{
				category: category || null,
				q: query || null,
				perPage,
				page,
				...parsedFilters,
			},
		],
		{
			refetchOnWindowFocus: false,
		}
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
}
