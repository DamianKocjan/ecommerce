import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Flex } from "../shared/core/Flex";
import { useToggleBetween } from "../shared/hooks/useToggleBetween";

const TEXTS = [
	<>
		Place your order as soon as possible to receive your parcel before
		Christmas.{" "}
		<Link href="/catalog" className="underline">
			Browse
		</Link>
		.{" "}
		<Link href="/help" className="underline">
			Get help
		</Link>
		.
	</>,
	<>
		Free shipping and 30 days free returns for members.{" "}
		<Link href="/join-us" className="underline">
			Join us
		</Link>
		.{" "}
		<Link href="/help" className="underline">
			Find out more
		</Link>
		.
	</>,
];

export const SwiperBanner: React.FC = () => {
	const [mouseOver, setMouseOver] = useState(false);
	const [value, next] = useToggleBetween(TEXTS);
	const ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const second = setInterval(() => {
			if (mouseOver) {
				return;
			}

			ref.current?.classList.add("opacity-0");

			setTimeout(() => {
				ref.current?.classList.remove("opacity-0");
			}, 300);

			ref.current?.classList.add("opacity-0");

			setTimeout(() => {
				next();
				ref.current?.classList.remove("opacity-0");
			}, 300);
		}, 4000);

		return () => {
			clearInterval(second);
		};
	}, [mouseOver, next, ref]);

	const handleOnMouseEnter = useCallback(() => setMouseOver(true), []);
	const handleOnMouseLeave = useCallback(() => setMouseOver(false), []);

	return (
		<div className="my-2 w-full bg-gray-50">
			<div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
				<Flex items="center" justify="between" className="flex-1">
					<Flex
						items="center"
						className="w-0 flex-1 overflow-hidden"
						onMouseEnter={handleOnMouseEnter}
						onMouseLeave={handleOnMouseLeave}
					>
						<p
							className="ml-3 truncate font-medium text-gray-900 transition-opacity"
							ref={ref}
						>
							{value}
						</p>
					</Flex>
				</Flex>
			</div>
		</div>
	);
};
