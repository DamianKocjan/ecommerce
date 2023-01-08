import Link from "next/link";
import React, { useCallback, useState } from "react";

import { trpc } from "../../utils/trpc";
import { Flex } from "../shared/core/Flex";
import { ProductCard } from "./ProductCard";

export const NewProducts: React.FC = () => {
	const { data } = trpc.product.new.useQuery(
		{ perPage: 15 },
		{
			refetchOnWindowFocus: false,
		},
	);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!ref.current) {
				return;
			}

			setIsMouseDown(true);
			ref.current?.classList.remove("snap-x");
			setStartX(e.pageX - ref.current?.offsetLeft);
			setScrollLeft(ref.current?.scrollLeft);
		},
		[ref],
	);

	const handleMouseUp = useCallback(() => {
		setIsMouseDown(false);
		ref.current?.classList.add("snap-x");
	}, [ref]);

	const handleMouseLeave = useCallback(() => {
		setIsMouseDown(false);
		ref.current?.classList.add("snap-x");
	}, [ref]);

	// TODO: make it more easier to use for users
	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isMouseDown || !ref.current) {
				return;
			}

			e.preventDefault();

			const x = e.pageX - ref.current.offsetLeft;
			const walkX = (x - startX) * 2;

			ref.current.scrollLeft = scrollLeft - walkX;
		},
		[isMouseDown, startX, scrollLeft, ref],
	);

	return (
		<section className="mt-4">
			<h3 className="group relative mb-2 w-fit p-8 font-mono text-5xl font-semibold lg:text-6xl">
				<Link href="/c/new">Latest products</Link>
				<span className="absolute bottom-4 left-16 h-2 w-full scale-x-0 bg-black group-hover:animate-strikeThrough" />
			</h3>
			<Flex
				className="sm:scrollbar-thin w-full snap-x gap-8 overflow-x-auto p-6 pb-2"
				ref={ref}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				{data?.data.map((product) => (
					<ProductCard product={product} key={product.slug} />
				))}
			</Flex>
		</section>
	);
};
