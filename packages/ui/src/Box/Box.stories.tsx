import { ComponentMeta } from "@storybook/react";

import { Button } from "../Button";
import { Box, BoxProps } from "./Box";

export default {
	title: "Box",
	component: Box,
} as ComponentMeta<typeof Box>;

export const Default = (args: BoxProps) => (
	<Box {...args}>
		<Button>Default</Button>
	</Box>
);

export const Margin2 = () => (
	<Box margin={2}>
		<Button>Margin 2</Button>
	</Box>
);

export const Margin4 = () => (
	<Box margin={4}>
		<Button>Margin 4</Button>
	</Box>
);

export const Margin8 = () => (
	<Box margin={8}>
		<Button>Margin 8</Button>
	</Box>
);

export const Padding2 = () => (
	<Box padding={2}>
		<Button>Padding 2</Button>
	</Box>
);

export const Padding4 = () => (
	<Box padding={4}>
		<Button>Padding 4</Button>
	</Box>
);

export const Padding8 = () => (
	<Box padding={8}>
		<Button>Padding 8</Button>
	</Box>
);
