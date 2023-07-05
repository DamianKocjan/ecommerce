import { Star, StarHalf } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo } from "react";

import { trpc } from "../../../../utils/trpc";
import { Flex } from "../../../shared/core/Flex";
import { Tooltip } from "../../../shared/core/Tooltip";
import { classNames } from "../../../shared/utils/classnames";
import { useReviewFormDialog } from "./useReviewFormDialog";

const ReviewFormDialog = dynamic(
	() => import("./ReviewFormDialog").then((mod) => mod.ReviewFormDialog),
	{
		ssr: false,
	},
);

export interface RatingProps {
	slug: string;
}

export const Rating: React.FC<RatingProps> = ({ slug }) => {
	const { data: sessionData } = useSession();
	const { setOpen } = useReviewFormDialog();

	const queryKey = getQueryKey(trpc.review.get, { slug });
	const queryClient = useQueryClient();
	const { data } = trpc.review.get.useQuery(
		{
			slug,
		},
		{
			refetchOnWindowFocus: false,
		},
	);

	const averageRating = data?.averageRating ?? 0;
	const userReview = data?.userReview;

	const { mutateAsync: rateProduct } = trpc.review.rate.useMutation({
		async onSuccess() {
			try {
				await queryClient.invalidateQueries(queryKey);
			} catch (error) {
				console.error(error);
			}
		},
	});

	const handleRateProduct = useCallback(
		async (rating: number) => {
			if (!sessionData) {
				return;
			}

			await rateProduct({
				rating,
				slug,
			});
		},
		[rateProduct, sessionData, slug],
	);

	const stars = useMemo(
		() =>
			Array.from({ length: 5 }, (_, i) => {
				const star = i + 1;
				const handleOnClick = () => handleRateProduct(i + 1);

				if (star <= (userReview?.rating ?? 0)) {
					return (
						<button
							key={`product-rating-${star}`}
							className="rating__star"
							onClick={handleOnClick}
						>
							<span className="sr-only">{`${star} out of 5 stars`}</span>
							<Star key={star} weight="fill" className="text-teal-400" />
						</button>
					);
				} else if (star <= averageRating) {
					return (
						<button
							key={`product-rating-${star}`}
							className="rating__star rating__star-full"
							onClick={handleOnClick}
						>
							<span className="sr-only">{`${star} out of 5 stars`}</span>
							<Star key={star} weight="fill" />
						</button>
					);
				} else if (star - 0.5 <= averageRating) {
					return (
						<button
							key={`product-rating-${star}`}
							className="rating__star rating__star-half"
							onClick={handleOnClick}
						>
							<span className="sr-only">{`${star} out of 5 stars`}</span>
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
						<span className="sr-only">{`${star} out of 5 stars`}</span>
						<Star key={star} />
					</button>
				);
			}).reverse(),
		[userReview?.rating, averageRating, handleRateProduct],
	);

	return (
		<>
			<Flex items="center">
				<Tooltip title={`${averageRating} out of 5`}>
					<div className={classNames("rating", !sessionData ? "disabled" : "")}>
						{stars}
					</div>
				</Tooltip>
				<p className="sr-only">{averageRating.toFixed(2)} out of 5 stars</p>
				{userReview ? (
					<>
						<ReviewFormDialog slug={slug} review={userReview} />
						<button
							className="ml-2 underline decoration-teal-400"
							onClick={() => setOpen(true)}
						>
							{userReview.title && userReview.comment
								? "Edit review"
								: "Write review"}
						</button>
					</>
				) : null}
			</Flex>
		</>
	);
};
