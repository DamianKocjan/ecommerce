import { trpc } from "@/utils/trpc";
import { useSession } from "@ecommerce/auth/nextjs/client";
import { useCallback, useEffect } from "react";

export function useWishlist(productId: number) {
	const { data: session } = useSession();
	const addToWishlist = trpc.useMutation("addToWishlist");
	const removeFromWishlist = trpc.useMutation("removeFromWishlist");
	const isInWishlistQuery = trpc.useQuery(["isInWishlist", { productId }], {
		refetchOnWindowFocus: false,
		enabled: false,
	});

	const handleToggleWishlist = useCallback(() => {
		if (!session) {
			return;
		}

		if (isInWishlistQuery.data) {
			removeFromWishlist.mutate(
				{ id: isInWishlistQuery.data },
				{
					onSuccess: () => isInWishlistQuery.refetch(),
				}
			);
		} else {
			addToWishlist.mutate(
				{ productId },
				{
					onSuccess: () => isInWishlistQuery.refetch(),
				}
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
	}, [session]);

	return {
		handleToggleWishlist,
		isInWishlist: isInWishlistQuery.data ? true : false,
	};
}
