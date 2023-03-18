import { useState } from "react";

import type { NextPageWithLayout } from "../../pages/_app";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../shared/core/Spinner";
import { useCompactNumberFormatter } from "../shared/hooks/useCompactNumberFormatter";
import { Container, DashboardLayout } from "../shared/layout/DashboardLayout";
import { classNames } from "../shared/utils/classnames";
import { ChartBrowsers } from "./Charts/Browsers";
import { ChartDevices } from "./Charts/Devices";
import { ChartReferrers } from "./Charts/Referrers";
import { ChartViews } from "./Charts/Views";

type ChartType = "views" | "referrers" | "browsers" | "devices";

export const Dashboard: NextPageWithLayout = () => {
	const { data, isLoading, isError } = trpc.analytics.fetch.useQuery(
		undefined,
		{
			refetchOnWindowFocus: false,
		},
	);

	const [selectedChartType, setSelectedChartType] =
		useState<ChartType>("views");

	const numberCompactFormatter = useCompactNumberFormatter();

	const formattedViews = numberCompactFormatter.format(data?.pageviews ?? 0);
	const formattedTotalProducts = numberCompactFormatter.format(
		data?.totalProducts ?? 0,
	);
	const formattedTotalProfit = numberCompactFormatter.format(
		data?.totalProfit ?? 0,
	);
	const formattedTotalProfitToday = numberCompactFormatter.format(
		data?.totalProfitToday ?? 0,
	);
	const formattedTotalUsers = numberCompactFormatter.format(
		data?.totalUsers ?? 0,
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

	return (
		<Container title="Dashboard">
			<dl className="grid h-full grid-cols-1 grid-rows-none gap-5 md:grid-cols-7 md:grid-rows-5">
				<div className="overflow-hidden border border-black bg-white px-4 py-5 sm:p-6 md:col-span-2 md:row-span-1">
					<dt className="truncate text-sm font-medium text-gray-500">
						Total views
					</dt>
					<Wrapper>
						<dd
							className="mt-1 font-mono text-3xl font-semibold text-gray-900"
							title={data?.pageviews.toString()}
						>
							{formattedViews}
						</dd>
					</Wrapper>
				</div>

				<div className="col-span-2 row-span-1 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Total profit
					</dt>
					<Wrapper>
						<dd
							className="mt-1 font-mono text-3xl font-semibold text-gray-900"
							title={data?.totalProfit.toString()}
						>
							{formattedTotalProfit}
						</dd>
					</Wrapper>
				</div>

				<div className="col-span-3 row-span-3 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Profit this day
					</dt>
					<Wrapper>
						<dd
							className="mt-1 font-mono text-3xl font-semibold text-gray-900"
							title={data?.totalProfitToday.toString()}
						>
							{formattedTotalProfitToday}
						</dd>
					</Wrapper>
				</div>

				<div className="col-span-2 row-span-1 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Total products
					</dt>
					<Wrapper>
						<dd
							className="mt-1 font-mono text-3xl font-semibold text-gray-900"
							title={data?.totalProducts.toString()}
						>
							{formattedTotalProducts}
						</dd>
					</Wrapper>
				</div>

				<div className="col-span-2 row-span-1 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Total users
					</dt>
					<Wrapper>
						<dd
							className="mt-1 font-mono text-3xl font-semibold text-gray-900"
							title={data?.totalUsers.toString()}
						>
							{formattedTotalUsers}
						</dd>
					</Wrapper>
				</div>

				<div className="col-span-4 row-span-4 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Statistics
					</dt>
					<dd className="mt-1 font-mono text-3xl font-semibold text-gray-900">
						<div className="mb-2 flex gap-2">
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

				<div className="col-span-3 row-span-2 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
					<dt className="truncate text-sm font-medium text-gray-500">
						Latest orders
					</dt>
					<dd
						className="mt-1 font-mono text-3xl font-semibold text-gray-900"
						// title={data?.pageviews.toString()}
					>
						{formattedViews}
					</dd>
				</div>
			</dl>
		</Container>
	);
};

Dashboard.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
