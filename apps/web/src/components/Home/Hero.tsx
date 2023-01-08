import Link from "next/link";
import React from "react";

import { Button } from "../shared/core/Button";
import { Flex } from "../shared/core/Flex";

export const Hero: React.FC = () => {
	return (
		<Flex direction="col" className="md:flex-row">
			<div className="h-60 sm:h-96 md:h-[70vh] md:w-1/2">
				<img
					src="https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg"
					alt="New collection image"
					loading="lazy"
					className="h-full w-full object-cover"
				/>
			</div>
			<Flex
				direction="col"
				items="center"
				justify="center"
				className="p-4 md:w-1/2"
			>
				<h2 className="self-start font-mono text-5xl font-semibold md:text-6xl lg:text-7xl">
					New collection
				</h2>
				<p className="mt-4 p-2 text-lg">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
					quod, voluptate, quia, voluptates quas voluptatibus quibusdam
					accusantium quae voluptatum quidem quos.
				</p>
				{/* TODO: create ui button like link component */}
				<Link href="/c/new" legacyBehavior>
					<a className="mt-4 self-end">
						<Button intent="secondary">Checkout new collection</Button>
					</a>
				</Link>
			</Flex>
		</Flex>
	);
};
