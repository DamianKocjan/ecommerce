import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

import { showErrorToast } from "~/lib/handle-error";
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

	const handleToggleWishlist = React.useCallback(() => {
		if (!session) {
			toast("Sign in to add to wishlist", {
				description: "You need to sign in to add products to your wishlist",
			});
			return;
		}

		if (isInWishlistQuery.data) {
			removeFromWishlist.mutate(
				{ id: isInWishlistQuery.data },
				{
					onSuccess() {
						toast("Removed from wishlist", {
							description: "This product has been removed from your wishlist",
						});
						context.wishlist.isIn.setData(
							{
								productId: productSkuId,
							},
							null,
						);
					},
					onError(error) {
						console.error(error);
						showErrorToast(error);
					},
				},
			);
			return;
		}

		addToWishlist.mutate(
			{ productId: productSkuId },
			{
				onSuccess(data) {
					toast("Added to wishlist", {
						description: "This product has been added to your wishlist",
					});
					context.wishlist.isIn.setData(
						{
							productId: productSkuId,
						},
						data,
					);
				},
				onError(error) {
					console.error(error);
					showErrorToast(error);
				},
			},
		);
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
		isInWishlist: !!isInWishlistQuery.data,
	};
}
