import { useSession } from "next-auth/react";
import { useCallback } from "react";

import { trpc } from "../../../../utils/trpc";

const cacheTime = 1000 * 60 * 60 * 24 * 7; // 7 days

export function useWishlist(productId: number) {
	const { data: session } = useSession();
	const addToWishlist = trpc.wishlist.add.useMutation();
	const removeFromWishlist = trpc.wishlist.remove.useMutation();
	const isInWishlistQuery = trpc.wishlist.isIn.useQuery(
		{ productId },
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			initialData: null,
			cacheTime,
		},
	);
	const context = trpc.useContext();

	const handleToggleWishlist = useCallback(() => {
		if (!session) {
			return;
		}

		if (isInWishlistQuery.data) {
			removeFromWishlist.mutate(
				{ id: isInWishlistQuery.data },
				{
					onSuccess: () => {
						context.wishlist.isIn.setData(
							{
								productId,
							},
							null,
						);
					},
				},
			);
		} else {
			addToWishlist.mutate(
				{ productId },
				{
					onSuccess: (data) => {
						context.wishlist.isIn.setData(
							{
								productId,
							},
							data,
						);
					},
				},
			);
		}
	}, [
		session,
		isInWishlistQuery,
		removeFromWishlist,
		context.wishlist.isIn,
		productId,
		addToWishlist,
	]);

	return {
		handleToggleWishlist,
		isInWishlist: isInWishlistQuery.data ? true : false,
	};
}
