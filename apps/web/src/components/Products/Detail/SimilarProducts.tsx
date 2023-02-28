import Link from "next/link";
import React from "react";

import { Box } from "../../shared/core/Box";
import { Flex } from "../../shared/core/Flex";
import { Grid } from "../../shared/core/Grid";
import { PrettyContainer } from "../../shared/core/PrettyContainer";
import { useCurrencyFormatter } from "../../shared/hooks/useCurrencyFormatter";

const products = [
	{
		id: "1",
		slug: "product-1",
		name: "Product 1",
		price: 100,
		image: "https://source.unsplash.com/random",
		href: "/products/1",
		color: "red",
	},
	{
		id: "2",
		slug: "product-2",
		name: "Product 2",
		price: 200,
		image: "https://source.unsplash.com/random",
		href: "/products/2",
		color: "red",
	},
] as const;

// TODO
export const SimilarProducts: React.FC = () => {
	const currencyFormater = useCurrencyFormatter();

	return (
		<Box padding="4">
			<PrettyContainer className="mt-12">
				<h2 className="text-2xl font-extrabold tracking-tight">
					Similar Products
				</h2>
				<Grid
					cols="1"
					className="mt-6 gap-y-10 gap-x-6 pb-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				>
					{products.map((product) => (
						<div key={product.id} className="group relative">
							<div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden bg-gray-100 group-hover:opacity-75 lg:h-80">
								<img
									src={product.image}
									alt={product.name}
									className="h-full w-full object-cover object-center"
								/>
							</div>
							<Flex justify="between" className="mt-4">
								<div>
									<h3 className="text-sm text-white">
										<Link href={`/products/${product.slug}`}>
											<span aria-hidden="true" className="absolute inset-0" />
											{product.name}
										</Link>
									</h3>
									<p className="mt-1 text-sm text-gray-500">{product.color}</p>
								</div>
								<p className="text-sm font-medium text-white">
									{currencyFormater.format(product.price)}
								</p>
							</Flex>
						</div>
					))}
				</Grid>
			</PrettyContainer>
		</Box>
	);
};
