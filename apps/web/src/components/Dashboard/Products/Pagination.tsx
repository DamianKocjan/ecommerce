import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React from "react";
import { create } from "zustand";

import { type RouterOutputs } from "../../../utils/trpc";
import { Flex } from "../../shared/core/Flex";
import { IconButton } from "../../shared/core/IconButton";
import { PerPage } from "../PerPage";

interface PaginationState {
	page: number;
	next: () => void;
	prev: () => void;
	setPage: (page: number) => void;
}

export const usePagination = create<PaginationState>((set) => ({
	page: 1,
	next: () => set((state) => ({ page: state.page + 1 })),
	prev: () =>
		set((state) => {
			if (state.page === 1) return { page: 1 };
			return { page: state.page - 1 };
		}),
	setPage: (page) => set({ page }),
}));

interface PaginationProps {
	meta?: RouterOutputs["dashboard"]["products"]["meta"];
}

export const Pagination: React.FC<PaginationProps> = ({ meta }) => {
	const { next, prev } = usePagination();

	return (
		<Flex items="center">
			<PerPage />

			<div className="flex-1" />

			<Flex items="center">
				<IconButton intent="secondary" onClick={prev} disabled={!meta?.prev}>
					<span className="sr-only">Previous page</span>
					<CaretLeft className="h-4 w-4" weight="bold" />
				</IconButton>
				<span className="font-mono font-bold text-gray-900">
					{meta?.currentPage ?? 1}
				</span>
				<IconButton intent="secondary" onClick={next} disabled={!meta?.next}>
					<span className="sr-only">Next page</span>
					<CaretRight className="h-4 w-4" weight="bold" />
				</IconButton>
			</Flex>
		</Flex>
	);
};
