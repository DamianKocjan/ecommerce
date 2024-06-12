import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFilters, getProducts } from "~/server/products";
import { parseFilters } from "~/utils/product-filter";
import { Filters } from "./filters";
import { Pagination } from "./pagination";
import { ProductCard } from "./product-card";

type Props = {
	params: { categorySlug: string };
	searchParams: Record<string, string>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const categorySlug = params.categorySlug;

	const category = await prisma!.category.findUnique({
		where: {
			slug: categorySlug,
		},
		select: {
			name: true,
		},
	});

	if (!category) {
		return notFound();
	}
	return {
		title: category.name,
	};
}

export default async function Category({ searchParams, params }: Props) {
	const filters = parseFilters(searchParams);

	const [{ data, meta }, filtersData] = await Promise.all([
		getProducts({
			categorySlug: params.categorySlug,
			page: 1,
			perPage: 6,
			...filters,
		}),
		getFilters(params.categorySlug),
	]);

	return (
		<div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			{data.length === 0 && Object.keys(filters).length === 0 ? (
				<div className="flex flex-col items-center gap-4">
					<Image
						src="/undraw_web_search_re_efla.svg"
						alt=""
						width="600"
						height="400"
					/>
				</div>
			) : (
				<div className="grid grid-cols-5 gap-4">
					<Filters filters={filters} filtersData={filtersData} />

					<div className="col-span-4 flex flex-col gap-4">
						<div className="grid grid-cols-3 gap-4">
							{data.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>

						<Pagination
							currentPage={meta.currentPage}
							hasNextPage={meta.next !== undefined}
							hasPreviousPage={meta.prev !== meta.currentPage}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
