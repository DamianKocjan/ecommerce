import { ComponentMeta } from "@storybook/react";

import { Alert } from "./Alert";

export default {
	title: "Alert",
	component: Alert,
} as ComponentMeta<typeof Alert>;

export const Overview = () => (
	<>
		<h2>Intents</h2>
		<div>
			<Alert>Default</Alert>
			<Alert intent="primary">Primary</Alert>
			<Alert intent="secondary">Secondary</Alert>
			<Alert intent="success">Success</Alert>
			<Alert intent="warning">Warning</Alert>
			<Alert intent="danger">Danger</Alert>
		</div>
	</>
);

export const Default = () => <Alert>Default</Alert>;
export const Primary = () => <Alert intent="primary">Primary</Alert>;
export const Secondary = () => <Alert intent="secondary">Secondary</Alert>;
export const Success = () => <Alert intent="success">Success</Alert>;
export const Warning = () => <Alert intent="warning">Warning</Alert>;
export const Danger = () => <Alert intent="danger">Danger</Alert>;
