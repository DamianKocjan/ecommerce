import { ComponentMeta } from "@storybook/react";

import { Heading } from "./Heading";

export default {
	title: "Heading",
	component: Heading,
} as ComponentMeta<typeof Heading>;

export const Template = () => <Heading>Lorem ipsum dolor sit amet.</Heading>;
