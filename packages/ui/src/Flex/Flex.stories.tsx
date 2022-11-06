import { ComponentMeta } from "@storybook/react";

import { Button } from "../Button";
import { Flex } from "./Flex";

export default {
	title: "Flex",
	component: Flex,
} as ComponentMeta<typeof Flex>;

export const Template = () => (
	<Flex>
		<Button>Hello</Button>
		<Button>World</Button>
	</Flex>
);
