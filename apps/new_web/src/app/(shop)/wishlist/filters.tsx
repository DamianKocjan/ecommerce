import { FiltersPanel } from "./filters-panel";

export async function Filters({
	filters,
	userId,
}: {
	filters: Record<
		string | number,
		string | number | string[] | number[] | boolean
	>;
	userId: string;
}) {
	const data = await getFilters(userId);
	return (
		<div>
			{/* {JSON.stringify(filters)} */}

			{/* {JSON.stringify(data, null, 2)} */}

			<FiltersPanel
				filters={filters}
				attributeFilters={data.filters}
				priceFilters={data.prices}
			/>

			{/* <div className="flex items-end gap-4">
				<p>{data.prices._min.price}</p>

				<div className="flex flex-col justify-center gap-4">
					<p>0</p>
					<Slider
						min={data.prices._min.price || 0}
						step={0}
						defaultValue={
							data.prices._max - (data.prices._max - data.prices._min) / 2
						}
						max={data.prices._max.price || 0}
					/>
				</div>

				<p>{data.prices._max.price}</p>
			</div> */}
		</div>
	);
}

async function getFilters(userId: string) {
	const wishlistedProductIds = (
		await prisma!.wishlist.findMany({
			where: {
				userId,
			},
			select: {
				product: {
					select: {
						productId: true,
					},
				},
			},
		})
	).map((wishlist) => wishlist.product.productId);

	const [filters, prices] = await prisma!.$transaction([
		prisma!.attribute.findMany({
			where: {
				products: {
					some: {
						skus: {
							some: {
								id: {
									in: wishlistedProductIds,
								},
							},
						},
						categories: {
							some: {
								// slug: input.category,
							},
						},
					},
				},
			},
			select: {
				id: true,
				name: true,
				values: {
					where: {
						products: {
							some: {
								skus: {
									some: {
										id: {
											in: wishlistedProductIds,
										},
									},
								},
								categories: {
									some: {
										// slug: input.category,
									},
								},
							},
						},
					},
					select: {
						id: true,
						value: true,
						_count: {
							select: {
								products: {
									where: {
										skus: {
											some: {
												id: {
													in: wishlistedProductIds,
												},
											},
										},
										categories: {
											some: {
												// slug: input.category,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		}),
		prisma!.productVariant.aggregate({
			where: {
				product: {
					id: {
						in: wishlistedProductIds,
					},
					categories: {
						some: {
							// slug: input.category,
						},
					},
				},
			},
			_min: {
				price: true,
			},
			_max: {
				price: true,
			},
		}),
	]);

	return {
		filters,
		prices: {
			min: prices._min.price?.toNumber(),
			max: prices._max.price?.toNumber(),
		},
	};
}
