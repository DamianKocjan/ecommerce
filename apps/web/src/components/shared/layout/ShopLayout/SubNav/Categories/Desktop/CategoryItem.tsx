import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, {
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { Flex } from "~/components/shared/core/Flex";
import { useCategoryMenuOpen } from "./useCategoryMenuOpen";

export interface SubCategory {
	name: string;
	href: string;
}

export interface CategoryItemProps {
	name: string;
	href: string;
	image: string;
	columns: {
		subtitle: string;
		categories: SubCategory[];
	}[];
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
	name,
	href,
	columns,
	image,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLLIElement>(null);
	const leftOffset = useRef(0);
	// const width = useRef(1280);
	const { categoryMenuOpen, setCategoryMenuOpen } = useCategoryMenuOpen();
	const isCategoryMenuOpen = useMemo(
		() => categoryMenuOpen !== null,
		[categoryMenuOpen],
	);

	const handleMouseEnter = useCallback(() => {
		setIsOpen(true);
		setCategoryMenuOpen(name);
	}, [name, setCategoryMenuOpen]);
	const handleMouseLeave = useCallback(() => {
		setIsOpen(false);
		// setCategoryMenuOpen(null);
		setTimeout(() => setCategoryMenuOpen(null), 200);
	}, [setCategoryMenuOpen]);

	const calculateLeftOffset = useCallback(() => {
		if (!ref.current) {
			return;
		}

		const navElement = ref.current.parentElement?.parentElement;

		const navBoundingClientRect =
			navElement?.getBoundingClientRect() || new DOMRect();
		const liBoundingClientRect =
			ref.current?.getBoundingClientRect() || new DOMRect();

		leftOffset.current = liBoundingClientRect.left - navBoundingClientRect.left;
		// width.current = navBoundingClientRect.width;
	}, [leftOffset, ref]);

	// calculating left offset based on `nav` and `li` left offset
	// FIXME: cannot do useLayoutEffect on ssr - https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
	// FIXME: sometimes leftOffset is not calculated
	useLayoutEffect(() => {
		calculateLeftOffset();
	}, [calculateLeftOffset]);

	useLayoutEffect(() => {
		window.addEventListener("resize", calculateLeftOffset);

		return () => {
			window.removeEventListener("resize", calculateLeftOffset);
		};
	}, [calculateLeftOffset]);

	//! NEEDS REFACTOR TODO: make this some sort of dialog/popup
	return (
		<li
			className="relative px-2 py-1 before:absolute before:left-0.5 before:top-0.5 before:z-[-1] before:h-full before:w-full hover:bg-black hover:text-white hover:before:bg-teal-400 md:px-4 md:py-2"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={ref}
		>
			<Link href={href}>{name}</Link>
			<Transition
				show={isOpen}
				enter={!isCategoryMenuOpen ? "transition-all duration-75" : ""}
				enterFrom={!isCategoryMenuOpen ? "-translate-y-8 opacity-0" : ""}
				enterTo={!isCategoryMenuOpen ? "translate-y-0 opacity-100 block" : ""}
				leave={!isCategoryMenuOpen ? "transition-all duration-150" : ""}
				leaveFrom={!isCategoryMenuOpen ? "translate-y-0 opacity-100" : ""}
				leaveTo={!isCategoryMenuOpen ? "-translate-y-4 opacity-0 hidden" : ""}
				className="absolute left-0 right-0 z-30 mt-4 max-h-full w-[80rem]"
				style={{
					left: -leftOffset.current,
					// width: `${width.current}px`,
				}}
			>
				<Flex className="relative bg-black p-4 text-white before:absolute before:left-1 before:top-1 before:z-[-1] before:h-full before:w-full before:bg-teal-400">
					<Flex className="w-3/4">
						{columns.map(({ categories, subtitle }) => (
							<div key={subtitle} className="w-full">
								<h3 className="mb-4 text-lg decoration-teal-400 decoration-2 underline-offset-4 hover:underline">
									{subtitle}
								</h3>
								<ul className="pl-2">
									{categories.map(({ name, href }) => (
										<li
											key={name}
											className="my-2 decoration-teal-400 decoration-2 underline-offset-[3px] hover:underline"
										>
											<Link href={href}>{name}</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</Flex>
					<img
						src={image}
						alt=""
						className="block h-full w-1/4 object-cover"
						loading="lazy"
					/>
				</Flex>
			</Transition>
		</li>
	);
};
