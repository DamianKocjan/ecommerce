import { CaretLeft, CaretRight } from "phosphor-react";
import React from "react";

export interface PaginationProps {
	onChange: (value: number) => void;
	currentPage?: number;
	previousPage?: number | null;
	nextPage?: number | null;
}

// TODO: show pages in between
export const Pagination: React.FC<PaginationProps> = ({
	onChange,
	currentPage,
	previousPage,
	nextPage,
}) => {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center">
				<button
					className="px-3 py-2 rounded-l-lg text-gray-900 hover:text-teal-600 disabled:text-neutral-600 disabled:hover:text-neutral-600 focus:outline-none focus:shadow-outline"
					onClick={() => onChange(previousPage!)}
					disabled={!previousPage}
				>
					<span className="sr-only">Previous page</span>
					<CaretLeft className="h-5 w-5" weight="bold" />
				</button>
				<span className="text-gray-900 font-bold font-mono">{currentPage}</span>
				<button
					className="px-3 py-2 rounded-r-lg text-gray-900 hover:text-teal-600 disabled:text-neutral-600 disabled:hover:text-neutral-600 focus:outline-none focus:shadow-outline"
					onClick={() => onChange(nextPage!)}
					disabled={!nextPage}
				>
					<span className="sr-only">Next page</span>
					<CaretRight className="h-5 w-5" weight="bold" />
				</button>
			</div>
		</div>
	);
};
