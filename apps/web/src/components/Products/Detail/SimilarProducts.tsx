import { useCurrencyFormatter } from "@/components/shared/formatters";
import { Flex, Grid, PrettyContainer } from "@ecommerce/ui";
import React from "react";

const products = [
	{
		id: "1",
		name: "Product 1",
		price: 100,
		image: "https://source.unsplash.com/random",
		href: "/products/1",
		color: "red",
	},
	{
		id: "2",
		name: "Product 2",
		price: 200,
		image: "https://source.unsplash.com/random",
		href: "/products/2",
		color: "red",
	},
];

// TODO
export const SimilarProducts: React.FC = () => {
	const currencyFormater = useCurrencyFormatter();

	return (
		<PrettyContainer className="mt-12">
			<h2 className="text-2xl font-extrabold tracking-tight">
				Similar Products
			</h2>
			<Grid
				cols="1"
				className="mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-2"
			>
				{products.map((product) => (
					<div key={product.id} className="group relative">
						<div className="w-full min-h-80 bg-gray-100 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-full object-center object-cover"
							/>
						</div>
						<Flex justify="center" className="mt-4">
							<div>
								<h3 className="text-sm text-white">
									<a href={product.href}>
										<span aria-hidden="true" className="absolute inset-0" />
										{product.name}
									</a>
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
	);
};
