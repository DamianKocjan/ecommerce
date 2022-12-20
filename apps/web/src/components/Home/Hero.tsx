import { Button, Flex } from "@ecommerce/ui";
import Link from "next/link";

export const Hero: React.FC = () => {
	return (
		<Flex direction="col" className="md:flex-row">
			<div className="md:w-1/2 h-60 sm:h-96 md:h-[70vh]">
				<img
					src="https://tailwindcss.com/_next/static/media/retro-shoe.24e25785.jpg"
					alt="New collection image"
					loading="lazy"
					className="w-full h-full object-cover"
				/>
			</div>
			<Flex
				direction="col"
				items="center"
				justify="center"
				className="md:w-1/2 p-4"
			>
				<h2 className="text-5xl md:text-6xl lg:text-7xl font-mono font-semibold self-start">
					New collection
				</h2>
				<p className="mt-4 p-2 text-lg">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
					quod, voluptate, quia, voluptates quas voluptatibus quibusdam
					accusantium quae voluptatum quidem quos.
				</p>
				{/* TODO: create ui button like link component */}
				<Link href="/c/new">
					<a className="self-end mt-4">
						<Button intent="secondary">Checkout new collection</Button>
					</a>
				</Link>
			</Flex>
		</Flex>
	);
};
