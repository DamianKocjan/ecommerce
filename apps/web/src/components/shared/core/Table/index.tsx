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

const _Td: React.FC<TdProps> = ({ className, align, ...props }) => {
	return <td className={td({ align, class: className })} {...props} />;
};

export const Td = memo(_Td);

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

const _Th: React.FC<ThProps> = ({ className, align, ...props }) => {
	return <th className={th({ align, class: className })} {...props} />;
};

export const Th = memo(_Th);

type WithChildren<T = unknown> = T & { children: React.ReactNode };

type THeadProps = WithChildren;

const _THead: React.FC<THeadProps> = ({ children }) => {
	return <thead>{children}</thead>;
};

export const THead = memo(_THead);

type TBodyProps = WithChildren<React.HTMLAttributes<HTMLTableSectionElement>>;

const _TBody: React.FC<TBodyProps> = ({ children, ...props }) => {
	return (
		<tbody className="divide-y divide-gray-200" {...props}>
			{children}
		</tbody>
	);
};

export const TBody = memo(_TBody);

type TableProps = WithChildren<React.HTMLAttributes<HTMLTableElement>>;

const _Table: React.FC<TableProps> = ({ children, ...props }) => {
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
};

export const Table = memo(_Table);
