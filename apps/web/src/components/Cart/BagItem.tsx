import Link from "next/link";
import { Check, Clock, X } from "phosphor-react";
import React, { useMemo } from "react";

import { RouterOutputs } from "../../utils/trpc";
import { Flex } from "../shared/core/Flex";
import { IconButton } from "../shared/core/IconButton";
import { useCurrencyFormatter } from "../shared/hooks/useCurrencyFormatter";
import { useBag } from "../shared/layout/Bag/useBag";

export interface BagItemProps {
	product: RouterOutputs["product"]["bag"][number];
}

export const BagItem: React.FC<BagItemProps> = ({ product }) => {
	const currencyFormater = useCurrencyFormatter();
	const { handleToggleBag } = useBag(product.slug);

	const price = useMemo(
		() => currencyFormater.format(product.price),
		[currencyFormater, product.price],
	);

	return (
		<Flex as="li" className="py-6 sm:py-10">
			<div className="flex-shrink-0">
				<img
					src={product.thumbnailImage}
					alt={product.title}
					className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
				/>
			</div>

			<Flex direction="col" justify="between" className="ml-4 flex-1 sm:ml-6">
				<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
					<div>
						<Flex justify="between">
							<h3 className="text-sm">
								<Link
									href={`/products/${product.slug}`}
									className="font-medium text-gray-700 hover:text-gray-800"
								>
									{product.title}
								</Link>
							</h3>
						</Flex>
						<Flex className="mt-1 text-sm">
							<p className="text-gray-500">{product.colors[0]?.name}</p>
							{product.size ? (
								<p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
									{product.size.name}
								</p>
							) : null}
						</Flex>
						<p className="mt-1 font-mono text-sm font-medium text-gray-900">
							{price}
						</p>
					</div>

					<div className="mt-4 sm:mt-0 sm:pr-9">
						<label htmlFor={`quantity-${product.id}`} className="sr-only">
							Quantity, {product.title}
						</label>
						<select
							id={`quantity-${product.id}`}
							name={`quantity-${product.id}`}
							className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
						>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
							<option value={6}>6</option>
							<option value={7}>7</option>
							<option value={8}>8</option>
						</select>

						<div className="absolute top-0 right-0">
							<IconButton
								intent="secondary"
								type="button"
								className="-m-2 p-2 hover:text-gray-500"
								onClick={handleToggleBag}
							>
								<span className="sr-only">Remove</span>
								<X className="h-5 w-5" aria-hidden="true" />
							</IconButton>
						</div>
					</div>
				</div>

				<p className="mt-4 flex space-x-2 text-sm text-gray-700">
					{product.quantity > 0 ? (
						<Check
							className="h-5 w-5 flex-shrink-0 text-green-500"
							aria-hidden="true"
						/>
					) : (
						<Clock
							className="h-5 w-5 flex-shrink-0 text-gray-300"
							aria-hidden="true"
						/>
					)}

					<span>
						{/* FIXME: */}
						{/* {product.quantity > 0 ? "In stock" : `Ships in ${product.leadTime}`} */}
					</span>
				</p>
			</Flex>
		</Flex>
	);
};
