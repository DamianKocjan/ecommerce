import { IconButton } from "@ecommerce/ui";
import {
	Heart as HeartIcon,
	HeartBreak as HeartBreakIcon,
} from "phosphor-react";
import React, { useCallback, useState } from "react";
import { useWishlist } from "./useWishlist";

export interface WishlistIconButtonProps {
	productId: number;
}

export const WishlistIconButton: React.FC<WishlistIconButtonProps> = ({
	productId,
}) => {
	const { handleToggleWishlist, isInWishlist } = useWishlist(productId);
	const [additionalClasses, setAdditionalClasses] = useState("");

	const handleMouseUp = useCallback(() => {
		if (!isInWishlist) {
			return;
		}

		setAdditionalClasses("animate-upShake");

		setTimeout(() => {
			setAdditionalClasses("");
		}, 600);
	}, [isInWishlist]);

	return (
		<IconButton
			className={`hover:animate-wiggle group ${additionalClasses}`}
			onClick={handleToggleWishlist}
			onMouseUp={handleMouseUp}
		>
			<span className="sr-only">Add to wishlist</span>
			{isInWishlist ? (
				<>
					<HeartBreakIcon
						className="h-6 w-6 hidden group-hover:block"
						aria-hidden="true"
						weight="fill"
					/>
					<HeartIcon
						className="h-6 w-6 group-hover:hidden"
						aria-hidden="true"
						weight="fill"
					/>
				</>
			) : (
				<HeartIcon className="h-6 w-6" aria-hidden="true" />
			)}
		</IconButton>
	);
};
