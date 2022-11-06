import { ComponentMeta } from "@storybook/react";
import { Button } from "../Button";

import { Grid } from "./Grid";

export default {
	title: "Grid",
	component: Grid,
} as ComponentMeta<typeof Grid>;

export const Template = () => (
	<Grid>
		<Button>Hello</Button>
		<Button>World</Button>
	</Grid>
);
