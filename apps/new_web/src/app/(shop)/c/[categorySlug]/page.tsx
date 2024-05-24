import { Prisma, Season } from "@ecommerce/db";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { z } from "zod";
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
		page: 0,
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

function parseFilters(searchParams: Record<string, string>) {
	// Types of filters:
	// - [key]: [ints]
	// - [key]: [strings]
	// - [key]: int
	// - [key]: string
	// - [key]: boolean

	const filters = {} as Record<
		string | number,
		string | string[] | number | number[] | boolean
	>;

	for (const [key, value] of Object.entries(searchParams)) {
		const parsedKey = isNaN(Number(key)) ? key : Number(key);

		if (value.startsWith("[") && value.endsWith("]")) {
			const values = value.slice(1, -1).split(",");
			const areAllInts = values.every((v) => !isNaN(Number(v)));
			filters[parsedKey] = areAllInts
				? values.map((v) => Number(v))
				: values.map((v) => v);
		} else if (!isNaN(Number(value))) {
			filters[parsedKey] = Number(value);
		} else if (value === "true" || value === "false") {
			filters[parsedKey] = value === "true";
		} else {
			filters[parsedKey] = value;
		}
	}

	return filters;
}

function getOrderBy(
	orderBy?: string | null,
): Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput> | undefined {
	switch (orderBy) {
		case "popularity":
			return;
		case "priceLowToHigh":
			return {
				price: "asc",
			};
		case "priceHighToLow":
			return {
				price: "desc",
			};
		case "sales":
			return {
				discount: {
					sort: "desc",
					nulls: "last",
				},
			};
		default:
			return;
	}
}

export const productPaginationWithFiltersSchema = {
	q: z
		.string()
		.optional()
		.catch(() => undefined),
	sortBy: z
		.string()
		.optional()
		.catch(() => undefined),
	brands: z
		.array(z.number())
		.optional()
		.catch(() => undefined),
	priceMin: z
		.number()
		.optional()
		.catch(() => undefined),
	priceMax: z
		.number()
		.optional()
		.catch(() => undefined),
	onSaleRequired: z
		.boolean()
		.optional()
		.catch(() => undefined),
	multipack: z
		.boolean()
		.optional()
		.catch(() => undefined),
	season: z
		.nativeEnum(Season)
		.optional()
		.catch(() => undefined),
	delivery: z
		.boolean()
		.optional()
		.catch(() => undefined),
	perPage: z.number().catch(() => 10),
	page: z
		.number()
		.optional()
		.default(0)
		.catch(() => 0),
};

const obj = z.object(productPaginationWithFiltersSchema);

export function productPaginationWithFilters<T extends z.infer<typeof obj>>(
	input: T,
): Prisma.ProductWhereInput {
	return {
		OR: input.q
			? [
					{
						title: {
							contains: input.q,
							mode: "insensitive",
						},
					},
					{
						shortDescription: {
							contains: input.q,
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: input.q,
							mode: "insensitive",
						},
					},
				]
			: undefined,
		season:
			input.season && input.season !== "ALL"
				? {
						equals: input.season,
					}
				: undefined,
	};
}

function getPreviousPage({
	page,
	lastPage,
}: {
	page: number;
	lastPage: number;
}) {
	return page > 0 ? page - 1 : lastPage;
}

function getNextPage({ page, lastPage }: { page: number; lastPage: number }) {
	return page < lastPage ? page + 1 : undefined;
}

export function createPaginationMeta({
	total,
	page,
	perPage,
}: {
	total: number;
	page: number;
	perPage: number;
}) {
	const lastPage = Math.ceil(total / perPage);

	return {
		total,
		lastPage,
		currentPage: page,
		perPage,
		prev: getPreviousPage({ page, lastPage }),
		next: getNextPage({ page, lastPage }),
	};
}

async function getProducts({
	page,
	perPage,
	...filters
}: {
	page: number;
	perPage: number;
} & Record<string | number, string | number | string[] | number[]>) {
	const standardFilters = await obj.parseAsync({
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
				if (Object.hasOwn(standardFilters, key) || isNaN(Number(key))) {
					return;
				}
				return [key, filters[key]];
			})
			.filter(Boolean) as [string, string | number | string[] | number[]][]
	).reduce(
		(acc, [key, value]) => {
			acc[key] = value;
			return acc;
		},
		{} as Record<string, string | string[] | number | number[]>,
	);

	const where = {
		...productPaginationWithFilters(standardFilters),
		price: {
			gte: filters.priceMin,
			lte: filters.priceMax,
		},

		OR: Object.entries(restFilters).length
			? Object.entries(restFilters).map(([key, value]) => ({
					attributes: {
						some: {
							attribute: {
								id: Number(key),
							},
							id: {
								in: value,
							},
						},
					},
				}))
			: undefined,
	} as Prisma.ProductWhereInput;
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
