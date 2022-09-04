import { CaretLeft, CaretRight } from "phosphor-react";
import React from "react";

export type Cursor = number | string;

export interface PaginationProps {
	onChange: (value: Cursor) => void;
	nextCursor: Cursor | undefined;
	prevCursor: Cursor | undefined;
}

export const Pagination: React.FC<PaginationProps> = ({
	onChange,
	nextCursor,
	prevCursor,
}) => {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center">
				<button
					className="px-3 py-2 rounded-l-lg text-gray-900 hover:text-teal-600 disabled:text-neutral-600 disabled:hover:text-neutral-600 focus:outline-none focus:shadow-outline"
					onClick={() => onChange(prevCursor!)}
					disabled={!prevCursor}
				>
					<span className="sr-only">Previous page</span>
					<CaretLeft className="h-5 w-5" weight="bold" />
				</button>
				<button
					className="px-3 py-2 rounded-r-lg text-gray-900 hover:text-teal-600 disabled:text-neutral-600 disabled:hover:text-neutral-600 focus:outline-none focus:shadow-outline"
					onClick={() => onChange(nextCursor!)}
					disabled={!nextCursor}
				>
					<span className="sr-only">Next page</span>
					<CaretRight className="h-5 w-5" weight="bold" />
				</button>
			</div>
		</div>
	);
};
