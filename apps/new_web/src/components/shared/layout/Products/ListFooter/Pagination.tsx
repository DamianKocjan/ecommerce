import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React from "react";

import { Flex } from "~/components/shared/core/Flex";

export interface PaginationProps {
	onChange: (page?: number) => void;
	currentPage: number;
	previousPage?: number;
	nextPage?: number;
}

// TODO: show pages in between
export const Pagination: React.FC<PaginationProps> = ({
	onChange,
	currentPage,
	previousPage,
	nextPage,
}) => {
	return (
		<Flex items="center" justify="between">
			<Flex items="center">
				<button
					className="focus:shadow-outline rounded-l-lg px-3 py-2 text-gray-900 hover:text-teal-600 focus:outline-none disabled:text-neutral-600 disabled:hover:text-neutral-600"
					onClick={() => onChange(previousPage)}
					disabled={!previousPage}
				>
					<span className="sr-only">Previous page</span>
					<CaretLeft className="h-5 w-5" weight="bold" />
				</button>
				<span className="font-mono font-bold text-gray-900">{currentPage}</span>
				<button
					className="focus:shadow-outline rounded-r-lg px-3 py-2 text-gray-900 hover:text-teal-600 focus:outline-none disabled:text-neutral-600 disabled:hover:text-neutral-600"
					onClick={() => onChange(nextPage)}
					disabled={!nextPage}
				>
					<span className="sr-only">Next page</span>
					<CaretRight className="h-5 w-5" weight="bold" />
				</button>
			</Flex>
		</Flex>
	);
};
