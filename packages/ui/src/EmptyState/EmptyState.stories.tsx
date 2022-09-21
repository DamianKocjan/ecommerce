import React from "react";
import { ComponentMeta } from "@storybook/react";

import { EmptyState } from "./EmptyState";

export default {
	title: "Empty state",
	component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

export const Template = () => <EmptyState />;
