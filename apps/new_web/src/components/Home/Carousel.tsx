import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";

import { Flex } from "~/components/shared/core/Flex";

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

// https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/wrap.ts
const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export interface CarouselProps {
	images: {
		src: string;
		alt: string;
	}[];
	nextPageCallback?: () => void;
	prevPageCallback?: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({
	images,
	nextPageCallback,
	prevPageCallback,
}) => {
	const [[page, direction], setPage] = useState([0, 0]);

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
	const imageIndex = useMemo(
		() => wrap(0, images.length, page),
		[images, page],
	);

	const paginate = useCallback(
		(newDirection: number) => {
			setPage([page + newDirection, newDirection]);
		},
		[page],
	);

	return (
		<Flex
			items="center"
			justify="center"
			className="relative min-h-[12rem] max-w-full overflow-hidden sm:min-h-[16rem] md:min-h-[20rem] lg:min-h-[24rem]"
		>
			<AnimatePresence initial={false} custom={direction}>
				<motion.img
					key={page}
					className="absolute max-w-full object-cover"
					src={images[imageIndex]?.src}
					alt={images[imageIndex]?.alt}
					loading="lazy"
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
							nextPageCallback?.();
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
							prevPageCallback?.();
						}
					}}
				/>
			</AnimatePresence>
			<Flex className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 gap-2">
				{images.map((_, i) => (
					<button
						key={i}
						className={`h-4 w-4 border border-black bg-white ${
							i === imageIndex ? "bg-black" : ""
						}`}
						onClick={() => {
							paginate(i - imageIndex);
						}}
					/>
				))}
			</Flex>
			<button
				className="absolute right-3 top-[calc(50%-1.25rem)] z-10 flex h-10 w-10 select-none items-center justify-center border border-black bg-white"
				onClick={() => {
					paginate(1);
					nextPageCallback?.();
				}}
			>
				<ArrowRight className="h-4 w-4 text-black" />
			</button>
			<button
				className="absolute left-3 top-[calc(50%-1.25rem)] z-10 flex h-10 w-10 select-none items-center justify-center border border-black bg-white"
				onClick={() => {
					paginate(-1);
					prevPageCallback?.();
				}}
			>
				<ArrowLeft className="h-4 w-4 text-black" />
			</button>
		</Flex>
	);
};
