import { cva, type VariantProps } from "class-variance-authority";
import { type ElementType } from "react";

import { type PolymorphicProps } from "~/utils/types";

const shimmer = cva("animate-pulse bg-black/25", {
	variants: {
		shape: {
			circle: "rounded-full",
			rounded: "rounded",
			rectangular: "rounded-none",
			text: "rounded-none",
		},
	},
});

const defaultElement = "div";

export type ShimmerProps<E extends ElementType = typeof defaultElement> =
	PolymorphicProps<E> & VariantProps<typeof shimmer>;

export function Shimmer({ className, shape, as, ...props }: ShimmerProps) {
	const Tag = as ?? defaultElement;

	return <Tag className={shimmer({ shape, class: className })} {...props} />;
}
