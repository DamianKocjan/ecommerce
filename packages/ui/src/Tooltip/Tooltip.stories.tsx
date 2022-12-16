import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Tooltip } from "./Tooltip";

export default {
	title: "Tooltip",
	component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const Template = () => <Tooltip />;
