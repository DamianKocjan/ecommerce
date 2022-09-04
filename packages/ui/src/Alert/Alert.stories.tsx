import { ComponentMeta } from "@storybook/react";

import { Alert } from "./Alert";

export default {
	title: "Alert",
	component: Alert,
} as ComponentMeta<typeof Alert>;

export const Template = () => <Alert />;
