import { ComponentMeta } from "@storybook/react";

import { PrettyImage } from "./PrettyImage";

export default {
	title: "Pretty image",
	component: PrettyImage,
} as ComponentMeta<typeof PrettyImage>;

export const Template = () => (
	<PrettyImage
		src="https://tailwindcss.com/_next/static/media/beach-house-interior-1.bc69273a536a51bb58092b2896b92e3a.jpg"
		alt="PrettyImage component"
	/>
);
