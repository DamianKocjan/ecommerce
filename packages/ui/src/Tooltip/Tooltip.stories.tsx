import { ComponentMeta } from "@storybook/react";

import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

export default {
	title: "Tooltip",
	component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const Template = () => (
	<Tooltip title="Tooltip">
		<Button>Hello</Button>
	</Tooltip>
);
