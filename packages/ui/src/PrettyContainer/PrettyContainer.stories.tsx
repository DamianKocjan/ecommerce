import { ComponentMeta } from "@storybook/react";

import { PrettyContainer } from "./PrettyContainer";

export default {
	title: "Pretty container",
	component: PrettyContainer,
} as ComponentMeta<typeof PrettyContainer>;

export const Template = () => (
	<PrettyContainer>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quasi
		expedita praesentium nostrum. Illum molestias libero quos repudiandae
		mollitia modi voluptatibus. In eius, recusandae quidem et molestiae aut.
		Sit, corporis?
	</PrettyContainer>
);
