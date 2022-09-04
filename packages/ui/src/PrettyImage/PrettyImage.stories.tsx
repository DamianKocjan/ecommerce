import React from "react";
import { ComponentMeta } from "@storybook/react";

import { PrettyImage } from "./PrettyImage";

export default {
	title: "Pretty image",
	component: PrettyImage,
} as ComponentMeta<typeof PrettyImage>;

export const Template = () => <PrettyImage />;
