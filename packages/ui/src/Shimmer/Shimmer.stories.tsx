import { ComponentMeta } from "@storybook/react";
import { Flex } from "../Flex";
import { Shimmer } from "./Shimmer";

export default {
	title: "Shimmer",
	component: Shimmer,
} as ComponentMeta<typeof Shimmer>;

export const Template = () => (
	<Flex className="gap-4" direction="col">
		<Shimmer shape="circle" className="w-40 h-40" />
		<Shimmer shape="rectangular" className="w-1/2 h-20" />
		<Shimmer shape="rounded" className="w-1/2 h-4" />
		<Shimmer shape="text" className="w-1/2 h-4" />
	</Flex>
);
