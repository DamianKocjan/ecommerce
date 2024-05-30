function getPreviousPage({
	page,
	lastPage,
}: {
	page: number;
	lastPage: number;
}) {
	return page > 1 ? page - 1 : lastPage;
}

function getNextPage({ page, lastPage }: { page: number; lastPage: number }) {
	return page < lastPage ? page + 1 : undefined;
}

export function createPaginationMeta({
	total,
	page,
	perPage,
}: {
	total: number;
	page: number;
	perPage: number;
}) {
	const lastPage = Math.ceil(total / perPage);

	return {
		total,
		lastPage,
		currentPage: page,
		perPage,
		prev: getPreviousPage({ page, lastPage }),
		next: getNextPage({ page, lastPage }),
	};
}
