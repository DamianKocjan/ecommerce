import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

import { trpc } from "../../../../utils/trpc";

export function useWishlist(productId: number) {
	const { data: session } = useSession();
	const addToWishlist = trpc.wishlist.add.useMutation();
	const removeFromWishlist = trpc.wishlist.remove.useMutation();
	const isInWishlistQuery = trpc.wishlist.isIn.useQuery(
		{ productId },
		{
			refetchOnWindowFocus: false,
			enabled: false,
		},
	);

	const handleToggleWishlist = useCallback(() => {
		if (!session) {
			return;
		}

		if (isInWishlistQuery.data) {
			removeFromWishlist.mutate(
				{ id: isInWishlistQuery.data },
				{
					onSuccess: () => isInWishlistQuery.refetch(),
				},
			);
		} else {
			addToWishlist.mutate(
				{ productId },
				{
					onSuccess: () => isInWishlistQuery.refetch(),
				},
			);
		}
	}, [
		productId,
		session,
		addToWishlist,
		removeFromWishlist,
		isInWishlistQuery,
	]);

	useEffect(() => {
		if (!session) {
			return;
		}

		isInWishlistQuery.refetch();
	}, [isInWishlistQuery, session]);

	return {
		handleToggleWishlist,
		isInWishlist: isInWishlistQuery.data ? true : false,
	};
}
