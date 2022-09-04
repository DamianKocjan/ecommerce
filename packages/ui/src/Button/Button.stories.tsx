import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";

import { Button, ButtonProps } from "./Button";

export default {
	title: "Button",
	component: Button,
} as ComponentMeta<typeof Button>;

export const Default = (args: ButtonProps) => (
	// @ts-ignore
	<Button {...args} onClick={action("button-click")}>
		Default
	</Button>
);

export const Primary = () => (
	<Button intent="primary" onClick={action("button-click")}>
		Primary
	</Button>
);

export const Secondary = () => (
	<Button intent="secondary" onClick={action("button-click")}>
		Secondary
	</Button>
);
