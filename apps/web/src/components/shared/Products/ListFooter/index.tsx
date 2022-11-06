import { Flex } from "@ecommerce/ui";
import { Pagination } from "./Pagination";
import { PerPage } from "./PerPage";

export interface ListFooterProps {
	handlePerPageChange: (value: number) => void;
	perPage: number;
	setPage: (value: number) => void;
	currentPage?: number;
	previousPage?: number | null;
	nextPage?: number | null;
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
