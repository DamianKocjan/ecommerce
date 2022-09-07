import { useFilter } from "@/features/filter";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { Categories } from "../shared/Categories";
import { Container } from "../shared/Container";
import { Filters } from "../shared/Products/Filters";
import { ProductsList } from "../shared/Products/List";
import { ListFooter } from "../shared/Products/ListFooter";
import { type Cursor } from "../shared/Products/ListFooter/Pagination";
import { PER_PAGE } from "../shared/Products/ListFooter/PerPage";

export function Category({ previousUrl }: { previousUrl: string }) {
	const router = useRouter();
	const category = router.query["slug"] as string;
	const query = router.query["q"] as string;

	const [perPage, setPerPage] = useState(
		typeof window !== "undefined"
			? Number(window.localStorage.getItem("perPage")) || PER_PAGE[0]
			: PER_PAGE[0]
	);
	const [cursor, setCursor] = useState<number | undefined>(undefined);

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
			"inifityProducts",
			{
				category: category || null,
				q: query || null,
				perPage,
				cursor,
				...parsedFilters,
			},
		],
		{
			refetchOnWindowFocus: false,
		}
	);

	return (
		<Container title="Products">
			<div className="flex gap-4 py-4">
				<Categories parentCategory={category} previousUrl={previousUrl} />
				<div className="w-3/4">
					<Filters />
					<ProductsList
						isLoading={products.isLoading}
						products={products.data?.items}
					/>
					<ListFooter
						handlePerPageChange={handlePerPageChange}
						perPage={perPage}
						setCursor={
							setCursor as React.Dispatch<
								React.SetStateAction<Cursor | undefined>
							>
						}
						nextCursor={products.data?.nextCursor}
						prevCursor={products.data?.prevCursor}
					/>
				</div>
			</div>
		</Container>
	);
}
