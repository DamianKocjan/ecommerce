import React from "react";

import { Flex } from "~/components/shared/core/Flex";
import { navigation } from "../constants";
import { MenuItem } from "./MenuItem";

export const Sidebar: React.FC = () => {
	return (
		<Flex
			media="md"
			direction="col"
			className="hidden md:fixed md:inset-y-0 md:w-64"
		>
			<Flex
				direction="col"
				className="flex-grow overflow-y-auto border-r border-gray-200 bg-white pt-5"
			>
				<Flex items="center" className="flex-shrink-0 px-4">
					<h1 className="h-8 font-mono text-3xl">Ecommerce</h1>
				</Flex>
				<Flex direction="col" className="mt-5 flex-grow">
					<nav className="flex-1 space-y-1 px-2 pb-4">
						{navigation.map((item) => (
							<MenuItem
								key={item.name}
								name={item.name}
								href={item.href}
								icon={item.icon}
								path={item.path}
							/>
						))}
					</nav>
				</Flex>
			</Flex>
		</Flex>
	);
};

export * from "./Mobile";
