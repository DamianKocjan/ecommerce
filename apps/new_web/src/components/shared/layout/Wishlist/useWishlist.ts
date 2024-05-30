import { useSession } from "next-auth/react";
import { useCallback } from "react";

import { trpc } from "~/utils/trpc";

export function useWishlist(productSkuId: number) {
	const { data: session } = useSession();
	const addToWishlist = trpc.wishlist.add.useMutation();
	const removeFromWishlist = trpc.wishlist.remove.useMutation();
	const isInWishlistQuery = trpc.wishlist.isIn.useQuery(
		{ productId: productSkuId },
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			initialData: null,
		},
	);
	const context = trpc.useUtils();

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
								productId: productSkuId,
							},
							null,
						);
					},
				},
			);
		} else {
			addToWishlist.mutate(
				{ productId: productSkuId },
				{
					onSuccess: (data) => {
						context.wishlist.isIn.setData(
							{
								productId: productSkuId,
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
		productSkuId,
		addToWishlist,
	]);

	return {
		handleToggleWishlist,
		isInWishlist: isInWishlistQuery.data ? true : false,
	};
}
