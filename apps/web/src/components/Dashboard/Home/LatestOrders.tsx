import Link from "next/link";
import React from "react";

import type { RouterOutputs } from "../../../utils/trpc";
import { Chip } from "../../shared/core/Chip";
import { useCurrencyFormatter } from "../../shared/hooks/useCurrencyFormatter";
import { useFormatRelativeDate } from "../../shared/hooks/useFormatRelativeDate";

interface LatestOrdersProps {
	orders?: RouterOutputs["analytics"]["fetch"]["latestOrders"];
}

// FIXME: Temporary UI
export const LatestOrders: React.FC<LatestOrdersProps> = ({ orders }) => {
	const dateFormatter = useFormatRelativeDate();
	const currencyFormatter = useCurrencyFormatter();

	return (
		<div className="col-span-3 row-span-2 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
			<dt className="truncate text-sm font-medium text-gray-500">
				Latest orders
			</dt>
			<dd className="mt-2 flex flex-col">
				{orders ? (
					<p className="text-semibold text-lg text-slate-700">No orders yet</p>
				) : (
					orders?.map((order, i) => (
						<div key={order.id}>
							<p className="flex items-center text-base text-slate-700">
								<Chip size="small">
									{dateFormatter(new Date(order.createdAt))}
								</Chip>
								<span className="ml-2 font-mono font-semibold">
									{currencyFormatter.format(order.total)}
								</span>
								<Link
									href="/"
									className="ml-auto decoration-teal-400 hover:underline"
								>
									#{order.id}
								</Link>
							</p>
							{orders?.[i + 1] && (
								<div className="my-2 block h-px w-full bg-gray-300" />
							)}
						</div>
					))
				)}
			</dd>
		</div>
	);
};
