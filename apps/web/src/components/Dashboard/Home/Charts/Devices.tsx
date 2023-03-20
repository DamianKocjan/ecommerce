import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import type { RouterOutputs } from "../../../../utils/trpc";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

interface ChartDevicesProps {
	data?: RouterOutputs["dashboard"]["analytics"]["device_types"];
}

export const ChartDevices: React.FC<ChartDevicesProps> = ({ data }) => {
	const [options, series] = useMemo(
		() =>
			[
				{
					chart: {
						height: 350,
						type: "donut",
					},
					dataLabels: {
						enabled: true,
						formatter(val: string) {
							return parseFloat(val).toFixed(2) + "%";
						},
					},
					colors: undefined,
					labels: ["Desktop", "Mobile", "Tablet"],
					tooltip: {
						custom({ seriesIndex }: { seriesIndex: number }) {
							const item = data?.[seriesIndex];
							if (!item) return "";
							return `${item?.value}: ${item?.visits} (unique: ${item?.uniqueVisits})`;
						},
					},
				},
				data?.map((item) => item.visits),
			] as [ApexOptions, ApexOptions["series"]],
		[data],
	);

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="donut"
			height={350}
			width="100%"
		/>
	);
};
