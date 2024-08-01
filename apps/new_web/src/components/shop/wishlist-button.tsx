import { Heart, HeartBreak } from "@phosphor-icons/react";
import React from "react";

import { useWishlist } from "~/hooks/use-wishlist";
import { Button } from "../ui/button";

type Props = {
	productSkuId: number;
};

export function WishlistIconButton({ productSkuId }: Props) {
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
			size="icon"
			type="button"
			className="group"
			onClick={handleToggleWishlist}
			onMouseUp={handleMouseUp}
		>
			<span className="sr-only">
				{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
			</span>
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

export function WishlistButton({ productSkuId }: Props) {
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
			variant="outline"
			type="button"
			className="group"
			onClick={handleToggleWishlist}
			onMouseUp={handleMouseUp}
		>
			{isInWishlist ? (
				<>
					<HeartBreak
						className={`mr-2 hidden h-4 w-4 hover:animate-wiggle group-hover:block ${additionalClasses}`}
						aria-hidden="true"
						weight="fill"
					/>
					<Heart
						className={`mr-2 h-4 w-4 hover:animate-wiggle group-hover:hidden ${additionalClasses}`}
						aria-hidden="true"
						weight="fill"
					/>
				</>
			) : (
				<Heart
					className={`mr-2 h-4 w-4 hover:animate-wiggle ${additionalClasses}`}
					aria-hidden="true"
				/>
			)}

			{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
		</Button>
	);
}
