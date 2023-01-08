import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ElementType, type Ref } from "react";

import { PolymorphicProps } from "../../utils/types";

const flex = cva("", {
	variants: {
		direction: {
			row: "flex-row",
			"row-reverse": "flex-row-reverse",
			col: "flex-col",
			"col-reverse": "flex-col-reverse",
		},
		wrap: {
			nowrap: "flex-nowrap",
			wrap: "flex-wrap",
			"wrap-reverse": "flex-wrap-reverse",
		},
		justify: {
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
		},
		items: {
			start: "items-start",
			end: "items-end",
			center: "items-center",
			baseline: "items-baseline",
			stretch: "items-stretch",
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
		direction: "row",
		media: "all",
	},
});

const defaultElement = "div";

export type FlexProps<E extends ElementType = typeof defaultElement> =
	PolymorphicProps<E> &
		VariantProps<typeof flex> & {
			className?: string;
		};

const FRefFlex = <E extends ElementType>(
	{
		as,
		className,
		children,
		direction,
		items,
		justify,
		media,
		wrap,
		...props
	}: FlexProps<E>,
	ref: Ref<any>,
) => {
	const Tag = as ?? defaultElement;

	return (
		<Tag
			className={flex({
				class: className,
				direction,
				items,
				justify,
				media,
				wrap,
			})}
			{...props}
			ref={ref}
		>
			{children}
		</Tag>
	);
};

export const Flex = forwardRef(FRefFlex) as <
	E extends ElementType = typeof defaultElement,
>(
	props: FlexProps<E> & { ref?: Ref<any> },
) => React.ReactElement;
