import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Shimmer } from "./Shimmer";

export default {
	title: "Shimmer",
	component: Shimmer,
} as ComponentMeta<typeof Shimmer>;

export const Template = () => <Shimmer />;
