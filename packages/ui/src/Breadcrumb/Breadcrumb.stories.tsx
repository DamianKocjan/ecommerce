import { ComponentMeta } from "@storybook/react";

import { Breadcrumb } from "./Breadcrumb";

export default {
	title: "Breadcrumb",
	component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

export const Default = () => (
	<Breadcrumb>
		<Breadcrumb.Link href="/" disabled>
			Home
		</Breadcrumb.Link>
		<Breadcrumb.Divider />
		<Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
	</Breadcrumb>
);
