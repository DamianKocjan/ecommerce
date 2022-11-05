import { ComponentMeta } from "@storybook/react";

import { Chip } from "./Chip";

export default {
	title: "Chip",
	component: Chip,
} as ComponentMeta<typeof Chip>;

export const Overview = () => (
	<>
		<h2>Intents</h2>
		<div>
			<Chip>Default</Chip>
			<Chip intent="primary">Primary</Chip>
			<Chip intent="secondary">Secondary</Chip>
			<Chip intent="success">Success</Chip>
			<Chip intent="warning">Warning</Chip>
			<Chip intent="danger">Danger</Chip>
		</div>
		<h2>Sizes</h2>
		<div>
			<Chip size="small">Small</Chip>
			<Chip size="medium">Medium</Chip>
			<Chip size="large">Large</Chip>
		</div>
	</>
);

export const Default = () => <Chip>Default</Chip>;
export const Primary = () => <Chip intent="primary">Primary</Chip>;
export const Secondary = () => <Chip intent="secondary">Secondary</Chip>;
export const Success = () => <Chip intent="success">Success</Chip>;
export const Warning = () => <Chip intent="warning">Warning</Chip>;
export const Danger = () => <Chip intent="danger">Danger</Chip>;

export const Small = () => <Chip size="small">Small</Chip>;
export const Medium = () => <Chip size="medium">Medium</Chip>;
export const Large = () => <Chip size="large">Large</Chip>;
