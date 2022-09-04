import React from "react";
import { ComponentMeta } from "@storybook/react";

import { ProductCardShimmer } from "./ProductCardShimmer";

export default {
	title: "Product card shimmer",
	component: ProductCardShimmer,
} as ComponentMeta<typeof ProductCardShimmer>;

export const Template = () => <ProductCardShimmer />;
