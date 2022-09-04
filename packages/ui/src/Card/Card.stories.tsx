import { ComponentMeta } from "@storybook/react";

import { Button } from "../Button";
import { Card, CardProps } from "./Card";

export default {
	title: "Card",
	component: Card,
} as ComponentMeta<typeof Card>;

export const Default = (args: CardProps) => (
	<Card {...args}>
		<Button>Default</Button>
	</Card>
);

export const ShadowMedium = () => (
	<Card shadow="md">
		<Button>Shadow Medium</Button>
	</Card>
);

export const ShadowLarge = () => (
	<Card shadow="lg">
		<Button>Shadow Large</Button>
	</Card>
);

export const ShadowXL = () => (
	<Card shadow="xl">
		<Button>Shadow XL</Button>
	</Card>
);
