import { classNames } from "@/components/shared/utils";
import { useSession } from "@ecommerce/auth/nextjs/client";
import { Flex, Tooltip } from "@ecommerce/ui";
import { Star, StarHalf } from "phosphor-react";
import React, { useCallback, useMemo } from "react";

export interface RatingProps {
	rating: number;
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {
	const { data: sessionData } = useSession();

	const handleRateProduct = useCallback(
		async (rating: number) => {
			if (!sessionData) {
				return;
			}

			console.log("rate product", rating);

			// TODO: Rate product
		},
		[sessionData]
	);

	const stars = useMemo(
		() =>
			Array.from({ length: 5 }, (_, i) => {
				const star = i + 1;
				const handleOnClick = async () => await handleRateProduct(i + 1);

				if (star <= rating) {
					return (
						<button
							key={`product-rating-${star}`}
							className="rating__star rating__star-full"
							onClick={handleOnClick}
						>
							<Star key={star} weight="fill" />
						</button>
					);
				} else if (star - 0.5 <= rating) {
					return (
						<button
							key={`product-rating-${star}`}
							className="rating__star rating__star-half"
							onClick={handleOnClick}
						>
							<StarHalf key={star} weight="fill" />
						</button>
					);
				}
				return (
					<button
						key={`product-rating-${star}`}
						className="rating__star rating__star-empty"
						onClick={handleOnClick}
					>
						<Star key={star} />
					</button>
				);
			}).reverse(),
		[rating]
	);

	return (
		<Flex items="center">
			<Tooltip title={rating.toString()}>
				<div className={classNames("rating", !sessionData ? "disabled" : "")}>
					{stars}
				</div>
			</Tooltip>
			<p className="sr-only">{rating} out of 5 stars</p>
		</Flex>
	);
};
