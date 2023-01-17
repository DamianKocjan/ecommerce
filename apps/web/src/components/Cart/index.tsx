import { useMemo } from "react";

import { useBag } from "../../features/bag";
import { NextPageWithLayout } from "../../pages/_app";
import { trpc } from "../../utils/trpc";
import { Container } from "../shared/core/Container";
import { Flex } from "../shared/core/Flex";
import { Spinner } from "../shared/core/Spinner";
import { BagItem } from "./BagItem";
import { OrderSummary } from "./OrderSummary";

export const Cart: NextPageWithLayout = () => {
	const products = useBag((state) => state.products);

	const { data, isError, isLoading } = trpc.product.bag.useQuery(
		{ products },
		{
			refetchOnWindowFocus: false,
		},
	);

	const quantity = 1;
	const subtotal = useMemo(
		() =>
			data
				? data.reduce((acc, product) => acc + product.price * quantity, 0)
				: 0,
		[data],
	);

	return (
		<Container title="Your shopping bag">
			<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
				Shopping Bag
			</h1>
			<form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				<section aria-labelledby="cart-heading" className="lg:col-span-7">
					<h2 id="cart-heading" className="sr-only">
						Items in your shopping bag
					</h2>
					{isLoading ? (
						<Flex justify="center" items="center" className="h-32">
							<Spinner />
						</Flex>
					) : isError ? (
						<Flex justify="center" items="center" className="h-32">
							<h3>There was an error fetching your bag. Please try again.</h3>
						</Flex>
					) : !data ? (
						<Flex justify="center" items="center" className="h-32">
							<h3>Your bag is empty.</h3>
						</Flex>
					) : (
						<ul
							role="list"
							className="divide-y divide-gray-200 border-t border-b border-gray-200"
						>
							{data.map((product) => (
								<BagItem key={product.slug} product={product} />
							))}
						</ul>
					)}
				</section>

				{/* Order summary */}
				<OrderSummary subtotal={subtotal} />
			</form>
		</Container>
	);
};
