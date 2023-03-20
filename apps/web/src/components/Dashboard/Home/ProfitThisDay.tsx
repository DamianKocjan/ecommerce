import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import type { RouterOutputs } from "../../../utils/trpc";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const SHORT_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
] as const;

interface ProfitThisDayProps {
	totalProfitToday: string;
	totalProfitWeekPerDay?: RouterOutputs["analytics"]["fetch"]["totalProfitWeekPerDay"];
}

export const ProfitThisDay: React.FC<ProfitThisDayProps> = ({
	totalProfitToday,
	totalProfitWeekPerDay,
}) => {
	const formattedTotalProfitWeekPerDay = useMemo(
		() => totalProfitWeekPerDay?.map((item) => item.profit) ?? [],
		[totalProfitWeekPerDay],
	);

	const categories = useMemo(
		() =>
			totalProfitWeekPerDay?.map((item) => {
				const date = new Date(item.date);
				const day = date.getDate() - 1;
				const month = SHORT_MONTHS[
					date.getMonth()
				] as typeof SHORT_MONTHS[number];

				return `${day} ${month}`;
			}) ?? [],
		[totalProfitWeekPerDay],
	);

	const [options, series] = useMemo(
		() =>
			[
				{
					chart: {
						height: 350,
						type: "line",
						zoom: {
							enabled: false,
						},
					},
					dataLabels: {
						enabled: false,
					},
					stroke: {
						curve: "smooth",
					},
					labels: ["Profits per day this week"],
					colors: ["#2DD4BF"],
					xaxis: {
						categories,
					},
					tooltip: {
						x: {
							show: false,
						},
						y: {
							title: {
								formatter: () => "Profit: ",
							},
						},
					},
				},
				[
					{
						name: "Profits per day this week",
						data: formattedTotalProfitWeekPerDay,
					},
				],
			] as [ApexOptions, ApexOptions["series"]],
		[categories, formattedTotalProfitWeekPerDay],
	);

	return (
		<div className="col-span-3 col-start-5 row-span-3 row-start-1 overflow-hidden border border-black bg-white px-4 py-5 sm:p-6">
			<dt className="truncate text-sm font-medium text-gray-500">
				Profit this day
			</dt>
			<dd className="mt-1 font-mono text-3xl font-semibold text-gray-900">
				{totalProfitToday}

				<ReactApexChart
					options={options}
					series={series}
					type="line"
					height={350}
					width="100%"
				/>
			</dd>
		</div>
	);
};
