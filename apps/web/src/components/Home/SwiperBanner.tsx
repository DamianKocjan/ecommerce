import { Flex } from "@ecommerce/ui";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useToggleBetween } from "../shared/hooks/useToggleBetween";

const TEXTS = [
	<>
		Place your order as soon as possible to receive your parcel before
		Christmas.{" "}
		<Link href="/catalog">
			<a className="underline">Browse</a>
		</Link>
		.{" "}
		<Link href="/help">
			<a className="underline">Get help</a>
		</Link>
		.
	</>,
	<>
		Free shipping and 30 days free returns for members.{" "}
		<Link href="/join-us">
			<a className="underline">Join us</a>
		</Link>
		.{" "}
		<Link href="/help">
			<a className="underline">Find out more</a>
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
		<div className="bg-gray-50 w-full my-2">
			<div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
				<Flex items="center" justify="between" className="flex-1">
					<Flex
						items="center"
						className="w-0 flex-1 overflow-hidden"
						onMouseEnter={handleOnMouseEnter}
						onMouseLeave={handleOnMouseLeave}
					>
						<p
							className="ml-3 font-medium text-gray-900 truncate transition-opacity"
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
