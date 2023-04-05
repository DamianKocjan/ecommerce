import { PencilSimpleLine } from "@phosphor-icons/react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

import { type RouterOutputs } from "../../../utils/trpc";
import { Spinner } from "../../shared/core/Spinner";
import { Table, TBody, Td, Th, THead } from "../../shared/core/Table";
import { useCurrencyFormatter } from "../../shared/hooks/useCurrencyFormatter";
import { useNumberFormatter } from "../../shared/hooks/useNumberFormatter";

type ProductsQuery = RouterOutputs["dashboard"]["products"];

interface ProductTableProps {
	data?: ProductsQuery["results"];
	isLoading: boolean;
}

const columnHelper = createColumnHelper<ProductsQuery["results"][number]>();

const columns = [
	columnHelper.accessor("title", {
		header: "Name",
		cell: (value) => value.renderValue(),
	}),
	columnHelper.accessor("manufacturer.name", {
		header: "Manufacturer",
		cell: (value) => value.renderValue(),
	}),
	columnHelper.accessor("price", {
		header: "Price",
		cell: (value) => {
			const formatter = useCurrencyFormatter();
			const formattedValue = formatter.format(value.renderValue() ?? 0);
			return formattedValue;
		},
	}),
	columnHelper.accessor("quantity", {
		header: "Stock",
		cell: (value) => {
			const formatter = useNumberFormatter();
			const formattedValue = formatter.format(value.renderValue() ?? 0);
			return formattedValue;
		},
	}),
	columnHelper.accessor("id", {
		header: "Actions",
		cell: (value) => (
			<div className="flex gap-4">
				<Link href={`/dashboard/products/${value.renderValue()}`}>View</Link>
				<Link
					href={`/dashboard/products/${value.renderValue()}/edit`}
					className="flex items-center gap-1"
				>
					<PencilSimpleLine className="h-5 w-5" aria-hidden="true" />
					<span>Edit</span>
				</Link>
			</div>
		),
	}),
];

// NOTE: This is a workaround for a bug in react-table where table keeps re-rendering
const emptyArray = [] as ProductsQuery["results"];

export const ProductTable: React.FC<ProductTableProps> = ({
	data,
	isLoading,
}) => {
	const table = useReactTable({
		data: data || emptyArray,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table>
			<THead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<Th align="left" key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext(),
									  )}
							</Th>
						))}
					</tr>
				))}
			</THead>
			<TBody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<Td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</Td>
						))}
					</tr>
				))}
				<tr>
					{/* @ts-expect-error type error */}
					<Td colSpan="9999">
						{isLoading ? (
							<div className="flex justify-center">
								<Spinner className="text-gray-400" />
							</div>
						) : table.getRowModel().flatRows.length < 1 ? (
							<div className="flex justify-center">
								<span className="text-gray-400">No products</span>
							</div>
						) : null}
					</Td>
				</tr>
			</TBody>
		</Table>
	);
};
