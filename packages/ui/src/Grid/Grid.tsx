import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ElementType } from "react";
import { PolymorphicProps } from "../types";

const grid = cva("", {
	variants: {
		flow: {
			row: "grid-flow-row",
			"row-dense": "grid-flow-row-dense",
			col: "grid-flow-col",
			"col-dense": "grid-flow-col-dense",
		},
		rows: {
			none: "grid-rows-none",
			"1": "grid-rows-1",
			"2": "grid-rows-2",
			"3": "grid-rows-3",
			"4": "grid-rows-4",
			"5": "grid-rows-5",
			"6": "grid-rows-6",
		},
		cols: {
			none: "grid-cols-none",
			"1": "grid-cols-1",
			"2": "grid-cols-2",
			"3": "grid-cols-3",
			"4": "grid-cols-4",
			"5": "grid-cols-5",
			"6": "grid-cols-6",
			"7": "grid-cols-7",
			"8": "grid-cols-8",
			"9": "grid-cols-9",
			"10": "grid-cols-10",
			"11": "grid-cols-11",
			"12": "grid-cols-12",
		},
		items: {
			start: "items-start",
			end: "items-end",
			center: "items-center",
			baseline: "items-baseline",
			stretch: "items-stretch",
		},
		justify: {
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
		},
		media: {
			sm: "sm:flex",
			md: "md:flex",
			lg: "lg:flex",
			xl: "xl:flex",
			"2xl": "2xl:flex",
			all: "flex",
		},
	},
	defaultVariants: {
		flow: "row",
		media: "all",
	},
});

const defaultElement = "div";

export type GridProps<E extends ElementType = typeof defaultElement> =
	PolymorphicProps<E> & VariantProps<typeof grid>;

export function Grid<E extends ElementType>({
	as,
	className,
	children,
	cols,
	flow,
	items,
	justify,
	media,
	rows,
	...props
}: GridProps<E>) {
	const Tag = as ?? defaultElement;

	return (
		<Tag
			className={grid({
				class: className,
				cols,
				flow,
				items,
				justify,
				media,
				rows,
			})}
			{...props}
		>
			{children}
		</Tag>
	);
}
