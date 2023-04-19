import Link from "next/link";
import { useState } from "react";

import type { NextPageWithLayout } from "../../../pages/_app";
import { trpc } from "../../../utils/trpc";
import { Flex } from "../../shared/core/Flex";
import { useDebounce } from "../../shared/hooks/useDebounce";
import {
	Container,
	DashboardLayout,
} from "../../shared/layout/DashboardLayout";
import { usePerPage } from "../PerPage";
import { Pagination, usePagination } from "./Pagination";
import { Search } from "./Search";
import { ProductTable } from "./Table";

export const DashboardProducts: NextPageWithLayout = () => {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 200);

	const { page, setPage } = usePagination();
	const [perPage] = usePerPage();

	const searchResultsQuery = trpc.dashboard.productSearch.useQuery(
		debouncedSearch,
		{
			enabled: !!debouncedSearch,
			refetchOnWindowFocus: false,
		},
	);

	const { data, isLoading } = trpc.dashboard.products.useQuery(
		{
			perPage,
			q: debouncedSearch,
			page,
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

	return (
		<Container title="Dashboard products">
			<Flex items="center">
				<Link
					href="/dashboard/products/create"
					className="text-xl font-semibold"
				>
					Create new product
				</Link>
				<div className="flex-1" />
				<Search
					value={search}
					onChange={(search) => setSearch(search)}
					isLoading={searchResultsQuery.isLoading}
					results={searchResultsQuery.data}
				/>
			</Flex>
			<ProductTable data={data?.results} isLoading={isLoading} />
			<Pagination meta={data?.meta} />
		</Container>
	);
};

DashboardProducts.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
