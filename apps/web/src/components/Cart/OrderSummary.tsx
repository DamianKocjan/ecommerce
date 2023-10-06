import { Question } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useMemo } from "react";

import { Button } from "~/components/shared/core/Button";
import { Flex } from "~/components/shared/core/Flex";
import { useCurrencyFormatter } from "~/components/shared/hooks/useCurrencyFormatter";

export interface OrderSummaryProps {
	subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
	const currencyFormater = useCurrencyFormatter();

	const shippingEstimate = useMemo(() => subtotal * 0.1, [subtotal]);
	const taxEstimate = useMemo(() => subtotal * 0.1, [subtotal]);
	const total = useMemo(
		() => subtotal + shippingEstimate + taxEstimate,
		[subtotal, shippingEstimate, taxEstimate],
	);

	const subtotalPrice = useMemo(
		() => currencyFormater.format(subtotal),
		[currencyFormater, subtotal],
	);
	const shippingEstimatePrice = useMemo(
		() => currencyFormater.format(shippingEstimate),
		[currencyFormater, shippingEstimate],
	);
	const taxEstimatePrice = useMemo(
		() => currencyFormater.format(taxEstimate),
		[currencyFormater, taxEstimate],
	);
	const totalPrice = useMemo(
		() => currencyFormater.format(total),
		[currencyFormater, total],
	);

	return (
		<section
			aria-labelledby="summary-heading"
			className="mt-16 bg-black px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
		>
			<h2 id="summary-heading" className="text-lg font-medium text-gray-100">
				Order summary
			</h2>

			<dl className="mt-6 space-y-4">
				<Flex items="center" justify="between">
					<dt className="text-sm text-gray-200">Subtotal</dt>
					<dd className="font-mono text-sm font-medium text-gray-100">
						{subtotalPrice}
					</dd>
				</Flex>
				<Flex
					items="center"
					justify="between"
					className="border-t border-gray-400 pt-4"
				>
					<Flex as="dt" items="center" className="text-sm text-gray-400">
						<span>Shipping estimate</span>
						<Link
							href=""
							className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">
								Learn more about how shipping is calculated
							</span>
							<Question className="h-5 w-5" aria-hidden="true" />
						</Link>
					</Flex>
					<dd className="font-mono text-sm font-medium text-gray-100">
						{shippingEstimatePrice}
					</dd>
				</Flex>
				<Flex
					items="center"
					justify="between"
					className="border-t border-gray-400 pt-4"
				>
					<Flex as="dt" className="text-sm text-gray-400">
						<span>Tax estimate</span>
						<Link
							href=""
							className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">
								Learn more about how tax is calculated
							</span>
							<Question className="h-5 w-5" aria-hidden="true" />
						</Link>
					</Flex>
					<dd className="font-mono text-sm font-medium text-gray-100">
						{taxEstimatePrice}
					</dd>
				</Flex>
				<Flex
					items="center"
					justify="between"
					className="border-t border-gray-400 pt-4"
				>
					<dt className="text-base font-medium text-gray-100">Order total</dt>
					<dd className="font-mono text-base font-medium text-gray-100">
						{totalPrice}
					</dd>
				</Flex>
			</dl>

			<div className="mt-6">
				<Button type="submit" className="w-full">
					Checkout
				</Button>
			</div>
		</section>
	);
};
