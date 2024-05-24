import { cva, type VariantProps } from "class-variance-authority";
import React, { memo } from "react";

const td = cva("whitespace-nowrap px-4 py-2 text-gray-700", {
	variants: {
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		},
	},
});

type TdProps = React.HTMLAttributes<HTMLTableCellElement> &
	VariantProps<typeof td>;

export const Td = memo<TdProps>(function Td({ className, align, ...props }) {
	return <td className={td({ align, class: className })} {...props} />;
});

const th = cva("whitespace-nowrap px-4 py-2 text-gray-900", {
	variants: {
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		},
	},
});

type ThProps = React.HTMLAttributes<HTMLTableCellElement> &
	VariantProps<typeof th>;

export const Th = memo<ThProps>(function Th({ className, align, ...props }) {
	return <th className={th({ align, class: className })} {...props} />;
});

type WithChildren<T = unknown> = T & { children: React.ReactNode };

type THeadProps = WithChildren;

export const THead = memo<THeadProps>(function THead({ children }) {
	return <thead>{children}</thead>;
});

type TBodyProps = WithChildren<React.HTMLAttributes<HTMLTableSectionElement>>;

export const TBody = memo<TBodyProps>(function TBody({ children, ...props }) {
	return (
		<tbody className="divide-y divide-gray-200" {...props}>
			{children}
		</tbody>
	);
});

type TableProps = WithChildren<React.HTMLAttributes<HTMLTableElement>>;

export const Table = memo<TableProps>(function Table({ children, ...props }) {
	return (
		<div className="overflow-x-auto">
			<table
				className="min-w-full divide-y-2 divide-gray-200 text-sm"
				{...props}
			>
				{children}
			</table>
		</div>
	);
});
