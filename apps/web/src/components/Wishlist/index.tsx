import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { PrettyContainer } from "@ecommerce/ui";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { Container } from "../shared/Container";
import { Empty } from "../shared/Products/Empty";
import { Filters } from "../shared/Products/Filters";
import { ProductsList } from "../shared/Products/List";
import { ListFooter } from "../shared/Products/ListFooter";
import { PER_PAGE } from "../shared/Products/ListFooter/PerPage";

export function Wishlist() {
	const router = useRouter();
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

	const handleSetPage = useCallback((page: number | undefined) => {
		setPage(page);
		router.push(
			{
				query: { ...router.query, page },
			},
			undefined,
			{ shallow: true }
		);
	}, []);

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

	const wishlisted = trpc.useQuery(
		[
			"wishlistedProducts",
			{
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
		<Container title="Your wishlist">
			<PrettyContainer className="mt-4">
				<h1 className="text-3xl">Your wishlist</h1>
			</PrettyContainer>
			<div className="my-2 mx-4">
				<Filters />
				{!wishlisted.isLoading && wishlisted.data?.data.length === 0 ? (
					<Empty />
				) : (
					<>
						<ProductsList
							isLoading={wishlisted.isLoading}
							products={wishlisted.data?.data.map(
								(wishlisted) => wishlisted.product
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
}

Wishlist.auth = true;
