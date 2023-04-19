import React from "react";

import { Flex } from "../../../core/Flex";
import { Pagination } from "./Pagination";
import { PerPage } from "./PerPage";

export interface ListFooterProps {
	handlePerPageChange: (perPage: number) => void;
	perPage: number;
	setPage: (page?: number) => void;
	currentPage: number;
	previousPage?: number;
	nextPage?: number;
}

export const ListFooter: React.FC<ListFooterProps> = ({
	handlePerPageChange,
	perPage,
	setPage,
	currentPage,
	previousPage,
	nextPage,
}) => {
	return (
		<Flex className="sm:pt-2">
			<PerPage onChange={handlePerPageChange} value={perPage} />
			<div className="flex-1" />
			<Pagination
				onChange={setPage}
				currentPage={currentPage}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</Flex>
	);
};
