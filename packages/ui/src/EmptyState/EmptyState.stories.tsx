import { ComponentMeta } from "@storybook/react";

import { EmptyState } from "./EmptyState";

export default {
	title: "Empty state",
	component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

export const Default = () => (
	<EmptyState
		title="Not found"
		description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit dolorem voluptates atque quis sunt."
	/>
);
