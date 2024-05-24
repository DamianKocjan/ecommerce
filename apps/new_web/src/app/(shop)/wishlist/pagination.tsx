"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { usePerPage } from "~/components/shared/layout/Products/ListFooter/usePerPage";

import { Button } from "~/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Muted } from "~/components/ui/typography";

const PER_PAGE = [6, 12, 24, 48] as const;

export function Pagination({
	currentPage,
	hasNextPage,
	hasPreviousPage,
}: {
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}) {
	return (
		<div className="col-span-3 flex">
			<PerPage />

			<div className="ml-auto flex items-center justify-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => {}}
					disabled={!hasPreviousPage}
				>
					<span className="sr-only">Previous page</span>
					<CaretLeft className="h-4 w-4" />
				</Button>
				<Muted>{currentPage}</Muted>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => {}}
					disabled={!hasNextPage}
				>
					<span className="sr-only">Next page</span>
					<CaretRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

function PerPage() {
	const [perPage, handlePerPageChange] = usePerPage();

	return (
		<Select
			defaultValue="10"
			value={perPage.toString()}
			onValueChange={(v) => handlePerPageChange(parseInt(v, 10))}
		>
			<SelectTrigger className="w-16">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{PER_PAGE.map((option) => (
						<SelectItem key={option} value={option.toString()}>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
