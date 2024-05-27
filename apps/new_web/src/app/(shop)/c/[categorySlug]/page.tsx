import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { productPaginationWithFiltersSchema } from "~/schemas/filters";
import { createPaginationMeta } from "~/utils/pagination";
import { isNumber, type Arrayish } from "~/utils/primitives";
import {
	assembleWhereProductStatement,
	getOrderBy,
	parseFilters,
} from "~/utils/product-filter";
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

export default async function Category({ searchParams }: Props) {
	const filters = parseFilters(searchParams);

	const { data, meta } = await getProducts({
		page: 1,
		perPage: 6,
		...filters,
	});

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
					<Filters filters={filters} />

					<div className="col-span-4 grid grid-cols-3 gap-4">
						{data.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}

						<Pagination
							currentPage={meta.currentPage}
							hasNextPage={meta.next !== undefined}
							hasPreviousPage={meta.prev !== undefined}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

async function getProducts({
	page,
	perPage,
	...filters
}: {
	page: number;
	perPage: number;
} & Record<string | number, Arrayish<string | number>>) {
	const standardFilters = await productPaginationWithFiltersSchema.parseAsync({
		q: filters.q,
		sortBy: filters.sortBy,
		brands: filters.brands,
		priceMin: filters.priceMin,
		priceMax: filters.priceMax,
		onSaleRequired: filters.onSaleRequired,
		multiPack: filters.multiPack,
		season: filters.season,
		delivery: filters.delivery,
		page,
		perPage,
	});
	// rest filters include attributes, which are not standard filters
	const restFilters = (
		Object.entries(filters)
			.map(([key]) => {
				if (Object.hasOwn(standardFilters, key) || !isNumber(key)) {
					return;
				} else if (!isNumber(filters[key]! as string)) {
					return;
				}
				return [key, filters[key]];
			})
			.filter(Boolean) as [string, Arrayish<number>][]
	).reduce(
		(acc, [key, value]) => {
			acc[key] = value;
			return acc;
		},
		{} as Record<string, Arrayish<number>>,
	);

	const where = assembleWhereProductStatement(standardFilters, restFilters);
	const orderBy = getOrderBy(filters.sortBy as string | null | undefined);

	const skip = page > 0 ? perPage * (page - 1) : 0;
	const [total, data] = await prisma!.$transaction([
		prisma!.product.count({ where }),
		prisma!.product.findMany({
			take: perPage,
			skip,
			where,
			orderBy,
			select: {
				id: true,
				slug: true,
				title: true,
				price: true,
				manufacturer: {
					select: {
						id: true,
						name: true,
					},
				},
				skus: {
					select: {
						id: true,
						sku: true,
						title: true,
						thumbnailImage: true,
						images: {
							select: {
								url: true,
							},
						},
						price: true,
						discount: true,
					},
					// where: {
					// 	price: {
					// 		gte: filters.priceMin as number,
					// 		lte: filters.priceMax as number,
					// 	},
					// 	OR: where?.OR!.map((or) => or.skus!.some!),
					// },
				},
			},
		}),
	]);

	return {
		data: data.map((item) => ({
			...item,
		})),
		meta: createPaginationMeta({ total, page, perPage }),
	};
}
