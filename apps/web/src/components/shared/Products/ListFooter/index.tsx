import { Pagination, type Cursor } from "./Pagination";
import { PerPage } from "./PerPage";

export interface ListFooterProps {
	handlePerPageChange: (value: number) => void;
	perPage: number;
	setCursor: (cursor: Cursor) => void;
	nextCursor: Cursor | undefined;
	prevCursor: Cursor | undefined;
}

export const ListFooter: React.FC<ListFooterProps> = ({
	handlePerPageChange,
	perPage,
	setCursor,
	nextCursor,
	prevCursor,
}) => {
	return (
		<div className="sm:pt-2 flex">
			<PerPage onChange={handlePerPageChange} value={perPage} />
			<div className="flex-1" />
			<Pagination
				onChange={setCursor}
				prevCursor={prevCursor}
				nextCursor={nextCursor}
			/>
		</div>
	);
};
