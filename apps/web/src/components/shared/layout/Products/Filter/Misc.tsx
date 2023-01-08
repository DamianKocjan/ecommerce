import { Popover, Transition } from "@headlessui/react";
import { FunnelSimple } from "phosphor-react";
import React, { Fragment } from "react";

import { Flex } from "../../../core/Flex";

export const MiscFilter: React.FC = () => {
	return (
		<Popover className="">
			<Popover.Button className="focus-visible:ring-teal relative w-full cursor-default py-2 pl-3 pr-4 text-left focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm">
				<span className="mr-4 block cursor-pointer truncate">Misc</span>
				<Flex
					as="span"
					items="center"
					className="pointer-events-none absolute inset-y-0 right-0 pr-1"
				>
					<FunnelSimple className="h-5 w-5 text-white" aria-hidden="true" />
				</Flex>
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel className="absolute z-10 mt-4 w-screen max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
					<div className="relative bg-black py-1 px-2 text-white before:absolute before:top-0.5 before:left-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 md:py-2 md:px-4 md:before:top-1 md:before:left-1">
						<a href="/insights">Insights</a>
						<a href="/automations">Automations</a>
						<a href="/reports">Reports</a>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};
