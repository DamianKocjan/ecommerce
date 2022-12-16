import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ElementType } from "react";
import { PolymorphicProps } from "../types";

export const box = cva("", {
	variants: {
		margin: { "0": "m-0", "2": "m-2", "4": "m-4", "8": "m-8" },
		padding: { "0": "p-0", "2": "p-2", "4": "p-4", "8": "p-8" },
	},
});

const defaultElement = "div";

export type BoxProps<E extends ElementType = typeof defaultElement> =
	PolymorphicProps<E> & VariantProps<typeof box>;

export function Box<E extends ElementType>({
	children,
	className,
	margin,
	padding,
	as,
	...props
}: BoxProps<E>) {
	const Tag = as ?? defaultElement;

	return (
		<Tag className={box({ margin, padding, class: className })} {...props}>
			{children}
		</Tag>
	);
}
