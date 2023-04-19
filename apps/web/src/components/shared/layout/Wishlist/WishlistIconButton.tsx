import {
	Heart as HeartIcon,
	HeartBreak as HeartBreakIcon,
} from "@phosphor-icons/react";
import React, { useCallback, useState } from "react";

import { IconButton } from "../../core/IconButton";
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
			intent="secondary"
			className={`group hover:animate-wiggle ${additionalClasses}`}
			type="button"
			onClick={handleToggleWishlist}
			onMouseUp={handleMouseUp}
		>
			<span className="sr-only">Add to wishlist</span>
			{isInWishlist ? (
				<>
					<HeartBreakIcon
						className="hidden h-6 w-6 group-hover:block"
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
