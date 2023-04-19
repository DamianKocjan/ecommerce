import React, { memo, useMemo } from "react";

import { type RouterOutputs } from "../../../../utils/trpc";
import { Flex } from "../../../shared/core/Flex";
import { useNumberFormatter } from "../../../shared/hooks/useNumberFormatter";
import { ChartReferrers } from "./Charts/Referrers";
import { ChartViews } from "./Charts/Views";

interface AnalyticsProps {
	data?: RouterOutputs["dashboard"]["product"]["analytics"];
}

export const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
	const numberFormatter = useNumberFormatter();
	const pageviews = useMemo(
		() => numberFormatter.format(data?.pageviews ?? 0),
		[data?.pageviews, numberFormatter],
	);

	return (
		<div className="mt-4 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
			<Flex>
				<h3>
					<span className="block text-sm font-medium text-gray-500">
						Analytics
					</span>

					<span className="mt-1 text-3xl font-semibold text-gray-900">
						Views & Referrers
					</span>
				</h3>

				{pageviews !== "0" ? (
					<div className="ml-auto">
						<h4 className="block text-sm font-medium text-gray-500">
							Total views
						</h4>

						<p className="mt-1 text-right text-3xl font-semibold text-gray-900">
							{pageviews}
						</p>
					</div>
				) : null}
			</Flex>

			{!data?.histogram?.length && !data?.referrers?.length ? (
				<h5 className="mt-4 font-mono text-2xl">
					No analytics found for this product!
				</h5>
			) : (
				<>
					<ChartViews data={data?.histogram} />

					<hr className="mt-6 border-t border-gray-200" />

					{data?.referrers?.length ? (
						<ChartReferrers data={data?.referrers} />
					) : (
						<h5 className="mt-4 font-mono text-2xl">
							No referrers found for this product!
						</h5>
					)}
				</>
			)}
		</div>
	);
};

export const AnalyticsLoading = memo(function AnalyticsLoading() {
	return (
		<div className="mt-4 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
			<h3>
				<span className="block text-sm font-medium text-gray-500">
					Analytics
				</span>

				<span className="mt-1 text-3xl font-semibold text-gray-900">
					Views & Referrers
				</span>
			</h3>

			{/* Charts */}
			<div className="mt-4">
				<div className="h-96 animate-pulse bg-gray-200" />

				<hr className="mt-6 border-t border-gray-200" />

				<div className="h-96 animate-pulse bg-gray-200" />
			</div>
		</div>
	);
});
