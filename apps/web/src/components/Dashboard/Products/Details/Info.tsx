import Image from "next/image";
import { memo } from "react";

import { ButtonLink } from "../../../shared/core/ButtonLink";
import { Flex } from "../../../shared/core/Flex";
import { usePrice } from "../../../shared/hooks/usePrice";

interface PriceProps {
	price: number;
	discount: number | null;
}

const Price = memo<PriceProps>(function Price({ discount, price }) {
	const { formattedDiscount, formattedPrice, percent } = usePrice({
		price,
		discount,
	});

	if (formattedDiscount) {
		return (
			<span
				className="ml-auto block text-xl font-bold text-gray-400"
				title={`${percent}% off`}
			>
				{formattedDiscount}{" "}
				<span className="text-gray-300 line-through">{formattedPrice}</span>
			</span>
		);
	}
	return (
		<span className="ml-auto block font-bold text-gray-400">
			{formattedPrice}
		</span>
	);
});

interface InfoProps {
	slug: string;
	title: string;
	price: number;
	discount: number | null;
	shortDescription: string;
	thumbnailImage: string;
}

export const Info = memo<InfoProps>(function Info({
	slug,
	title,
	price,
	discount,
	shortDescription,
	thumbnailImage,
}) {
	return (
		<Flex direction="col" className="gap-4 sm:flex-row">
			<div className="relative h-[500px] w-full sm:w-1/2 md:w-2/3">
				<Image src={thumbnailImage} alt={title} loading="lazy" fill />
			</div>
			<Flex
				direction="col"
				className="w-full bg-black p-4 text-white sm:w-1/2 md:w-1/3"
			>
				<h1 className="flex items-center text-3xl">
					{title} <Price discount={discount} price={price} />
				</h1>
				<p className="mt-4 indent-2 text-gray-300">{shortDescription}</p>

				<Flex items="stretch" className="mt-4 gap-2 sm:mt-auto">
					<ButtonLink
						href={`/products/${slug}`}
						intent="secondary"
						textColor="light"
						fullWidth
					>
						Preview
					</ButtonLink>
					<ButtonLink
						href={`/dashboard/products/${slug}/edit`}
						intent="secondary"
						textColor="light"
						fullWidth
					>
						Edit
					</ButtonLink>
				</Flex>
			</Flex>
		</Flex>
	);
});

export const InfoLoading = memo(function InfoLoading() {
	return (
		<Flex direction="col" className="gap-4 sm:flex-row">
			<div className="relative h-[500px] w-full animate-pulse bg-black/25 sm:w-1/2 md:w-2/3" />
			<Flex
				direction="col"
				className="w-full bg-black p-4 text-white sm:w-1/2 md:w-1/3"
			>
				{/* Title + Price */}
				<Flex>
					<span className="h-12 w-36 animate-pulse bg-white/25" />{" "}
					<span className="ml-auto block h-12 w-20 animate-pulse bg-white/25" />
				</Flex>
				{/* Description */}
				<div className="mt-4 h-40 w-full animate-pulse bg-white/25" />

				{/* Buttons */}
				<Flex items="stretch" className="mt-4 gap-2 sm:mt-auto">
					<div className="h-10 w-full animate-pulse bg-white/25" />
					<div className="h-10 w-full animate-pulse bg-white/25" />
				</Flex>
			</Flex>
		</Flex>
	);
});
