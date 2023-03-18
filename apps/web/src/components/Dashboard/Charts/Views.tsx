import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import type { RouterOutputs } from "../../../utils/trpc";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

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

interface ChartViewsProps {
	data?: RouterOutputs["analytics"]["fetch"]["histogram"];
}

export const ChartViews: React.FC<ChartViewsProps> = ({ data }) => {
	const [shortNamedCategories, categories] = useMemo(() => {
		if (!data) return [[], []];

		const categories = [] as string[];
		const shortNamedCategories = [] as string[];

		data.forEach((item) => {
			const date = new Date(item.date);
			const year = date.getFullYear();
			const month = date.getMonth();
			const day = date.getDay() + 1;

			const monthName = MONTHS[month] as typeof MONTHS[number];
			const shortMonthName = SHORT_MONTHS[month] as typeof SHORT_MONTHS[number];

			shortNamedCategories.push(`${day} ${monthName} ${year}`);
			categories.push(`${day} ${shortMonthName}`);
		});

		return [shortNamedCategories, categories];
	}, [data]);

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
					labels: ["Page views", "Visitors"],
					colors: ["#2DD4BF"],
					xaxis: {
						overwriteCategories: categories,
						categories: shortNamedCategories,
					},
				},
				[
					{
						name: "Page views",
						data: data?.map((item) => item.pageviews) ?? [],
					},
					{
						name: "Visitors",
						data: data?.map((item) => item.visitors) ?? [],
						color: "#000000",
					},
				],
			] as [ApexOptions, ApexOptions["series"]],
		[categories, data, shortNamedCategories],
	);

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="line"
			height={350}
			width="100%"
		/>
	);
};
