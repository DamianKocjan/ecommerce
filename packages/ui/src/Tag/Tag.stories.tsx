import { ComponentMeta } from "@storybook/react";

import { Tag } from "./Tag";

export default {
	title: "Tag",
	component: Tag,
} as ComponentMeta<typeof Tag>;

export const Overview = () => (
	<>
		<h2>Intents</h2>
		<div>
			<Tag>Default</Tag>
			<Tag intent="primary">Primary</Tag>
			<Tag intent="secondary">Secondary</Tag>
			<Tag intent="success">Success</Tag>
			<Tag intent="warning">Warning</Tag>
			<Tag intent="danger">Danger</Tag>
		</div>
		<h2>Sizes</h2>
		<div>
			<Tag size="small">Small</Tag>
			<Tag size="medium">Medium</Tag>
			<Tag size="large">Large</Tag>
		</div>
	</>
);

export const Default = () => <Tag>Default</Tag>;
export const Primary = () => <Tag intent="primary">Primary</Tag>;
export const Secondary = () => <Tag intent="secondary">Secondary</Tag>;
export const Success = () => <Tag intent="success">Success</Tag>;
export const Warning = () => <Tag intent="warning">Warning</Tag>;
export const Danger = () => <Tag intent="danger">Danger</Tag>;

export const Small = () => <Tag size="small">Small</Tag>;
export const Medium = () => <Tag size="medium">Medium</Tag>;
export const Large = () => <Tag size="large">Large</Tag>;
