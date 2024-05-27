import { type Arrayish } from "~/utils/primitives";
import { FiltersPanel } from "./filters-panel";

export async function Filters({
	filters,
}: {
	filters: Record<string | number, Arrayish<string | number | boolean>>;
}) {
	const data = await getFilters();

	return (
		<div>
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

async function getFilters() {
	const [filters, prices] = await prisma!.$transaction([
		prisma!.attribute.findMany({
			where: {
				values: {
					some: {
						productVariants: {
							some: {
								product: {
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
			select: {
				id: true,
				name: true,
				values: {
					select: {
						id: true,
						value: true,
						_count: {
							select: {
								productVariants: {
									where: {
										product: {
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
			},
		}),
		// prisma!.attributeValue.findMany({
		// 	where: {
		// 		productVariants: {
		// 			some: {
		// 				product: {
		// 					categories: {
		// 						some: {
		// 							// slug: input.category,
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// 	select: {
		// 		id: true,
		// 		value: true,
		// 		attributeId: true,
		// 		attribute: {
		// 			select: {
		// 				id: true,
		// 				name: true,
		// 			},
		// 		},
		// 		_count: {
		// 			select: {
		// 				productVariants: {
		// 					where: {
		// 						product: {
		// 							categories: {
		// 								some: {
		// 									// slug: input.category,
		// 								},
		// 							},
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// }),
		prisma!.product.aggregate({
			where: {
				categories: {
					some: {
						// slug: input.category,
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
