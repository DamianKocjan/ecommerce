import { Heart, HeartBreak } from "@phosphor-icons/react";
import React from "react";

import { useWishlist } from "~/hooks/use-wishlist";
import { Button } from "../ui/button";

export function WishlistButton({ productSkuId }: { productSkuId: number }) {
	const { handleToggleWishlist, isInWishlist } = useWishlist(productSkuId);
	const [additionalClasses, setAdditionalClasses] = React.useState("");

	const handleMouseUp = React.useCallback(() => {
		if (!isInWishlist) {
			return;
		}

		setAdditionalClasses("animate-upShake");

		setTimeout(() => {
			setAdditionalClasses("");
		}, 600);
	}, [isInWishlist]);

	return (
		<Button
			variant="ghost"
			className="group"
			type="button"
			onClick={handleToggleWishlist}
			onMouseUp={handleMouseUp}
		>
			<span className="sr-only">Add to wishlist</span>
			{isInWishlist ? (
				<>
					<HeartBreak
						className={`hidden h-6 w-6 hover:animate-wiggle group-hover:block ${additionalClasses}`}
						aria-hidden="true"
						weight="fill"
					/>
					<Heart
						className={`h-6 w-6 hover:animate-wiggle group-hover:hidden ${additionalClasses}`}
						aria-hidden="true"
						weight="fill"
					/>
				</>
			) : (
				<Heart
					className={`h-6 w-6 hover:animate-wiggle ${additionalClasses}`}
					aria-hidden="true"
				/>
			)}
		</Button>
	);
}
