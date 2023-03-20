import React, { useState } from "react";

import type { NextPageWithLayout } from "../../../pages/_app";
import { trpc } from "../../../utils/trpc";
import { Spinner } from "../../shared/core/Spinner";
import { useCompactNumberFormatter } from "../../shared/hooks/useCompactNumberFormatter";
import { useCurrencyFormatter } from "../../shared/hooks/useCurrencyFormatter";
import {
	Container,
	DashboardLayout,
} from "../../shared/layout/DashboardLayout";
import { classNames } from "../../shared/utils/classnames";
import { ChartBrowsers } from "./Charts/Browsers";
import { ChartDevices } from "./Charts/Devices";
import { ChartReferrers } from "./Charts/Referrers";
import { ChartViews } from "./Charts/Views";
import { LatestOrders } from "./LatestOrders";
import { ProfitThisDay } from "./ProfitThisDay";

type ChartType = "views" | "referrers" | "browsers" | "devices";

export const Dashboard: NextPageWithLayout = () => {
	const { data, isLoading, isError } = trpc.dashboard.analytics.useQuery(
		undefined,
		{
			refetchOnWindowFocus: false,
		},
	);

	const [selectedChartType, setSelectedChartType] =
		useState<ChartType>("views");

	const numberCompactFormatter = useCompactNumberFormatter();
	const formattedViews = numberCompactFormatter.format(data?.pageviews ?? 0);
	const formattedTotalUsers = numberCompactFormatter.format(
		data?.totalUsers ?? 0,
	);

	const currencyFormatter = useCurrencyFormatter();
	const formattedTotalProducts = numberCompactFormatter.format(
		data?.totalProducts ?? 0,
	);
	const formattedTotalProfit = currencyFormatter.format(data?.totalProfit ?? 0);
	const formattedTotalProfitToday = currencyFormatter.format(
		data?.totalProfitToday ?? 0,
	);

	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		if (isLoading) {
			return (
				<dd className="mt-3 text-gray-900">
					<Spinner />
				</dd>
			);
		}
		if (isError || !data) {
			return (
				<dd className="mt-1 font-mono text-3xl font-semibold text-gray-900">
					0
				</dd>
			);
		}
		return <>{children}</>;
	};

	const Card: React.FC<{
		title: string;
		value?: string;
		description: string;
	}> = ({ description, title, value }) => (
		<div className="col-span-2 row-span-1 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
			<dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
			<Wrapper>
				<dd
					className="mt-1 font-mono text-3xl font-semibold text-gray-900"
					title={value}
				>
					{description}
				</dd>
			</Wrapper>
		</div>
	);

	return (
		<Container title="Dashboard">
			<dl className="flex h-full flex-col gap-5 md:grid md:grid-cols-7 md:grid-rows-5">
				<Card
					title="Total views"
					value={data?.pageviews.toString()}
					description={formattedViews}
				/>
				<Card
					title="Total profit"
					value={data?.totalProfit.toString()}
					description={formattedTotalProfit}
				/>
				<Card
					title="Total products"
					value={data?.totalProducts.toString()}
					description={formattedTotalProducts}
				/>
				<Card
					title="Total users"
					value={data?.totalUsers.toString()}
					description={formattedTotalUsers}
				/>

				<div className="col-span-4 row-span-4 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Statistics
					</dt>
					<dd className="mt-1 font-mono text-xl font-semibold text-gray-900 lg:text-3xl">
						<div className="mb-2 flex flex-wrap gap-4">
							<button
								className={classNames(
									selectedChartType === "views"
										? "underline decoration-teal-400"
										: "",
								)}
								onClick={() => setSelectedChartType("views")}
							>
								Views
							</button>
							<button
								className={classNames(
									selectedChartType === "referrers"
										? "underline decoration-teal-400"
										: "",
								)}
								onClick={() => setSelectedChartType("referrers")}
							>
								Referers
							</button>
							<button
								className={classNames(
									selectedChartType === "browsers"
										? "underline decoration-teal-400"
										: "",
								)}
								onClick={() => setSelectedChartType("browsers")}
							>
								Browsers
							</button>
							<button
								className={classNames(
									selectedChartType === "devices"
										? "underline decoration-teal-400"
										: "",
								)}
								onClick={() => setSelectedChartType("devices")}
							>
								Devices
							</button>
						</div>

						{selectedChartType === "views" ? (
							<ChartViews data={data?.histogram} />
						) : selectedChartType === "referrers" ? (
							<ChartReferrers data={data?.referrers} />
						) : selectedChartType === "browsers" ? (
							<ChartBrowsers data={data?.browser_names} />
						) : selectedChartType === "devices" ? (
							<ChartDevices data={data?.device_types} />
						) : null}
					</dd>
				</div>

				<ProfitThisDay
					totalProfitToday={formattedTotalProfitToday}
					totalProfitWeekPerDay={data?.totalProfitWeekPerDay}
				/>

				<LatestOrders orders={data?.latestOrders} />
			</dl>
		</Container>
	);
};

Dashboard.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
