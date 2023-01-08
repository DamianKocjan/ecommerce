import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ElementType, type Ref } from "react";

import { PolymorphicProps } from "../../utils/types";

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
			sm: "sm:grid",
			md: "md:grid",
			lg: "lg:grid",
			xl: "xl:grid",
			"2xl": "2xl:grid",
			all: "grid",
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

const FRefGrid = <E extends ElementType>(
	{
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
	}: GridProps<E>,
	ref: Ref<any>,
) => {
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
			ref={ref}
		>
			{children}
		</Tag>
	);
};

export const Grid = forwardRef(FRefGrid) as <E extends ElementType>(
	props: GridProps<E> & { ref?: Ref<any> },
) => React.ReactElement;
