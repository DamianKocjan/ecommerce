import React from "react";

import { Flex } from "~/components/shared/core/Flex";
import { Nav } from "./Nav";
import { Sidebar, SidebarMobile } from "./Sidebar";
import { useCurrentPath } from "./Sidebar/store";

export interface DashboardLayoutProps {
	children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	children,
}) => {
	useCurrentPath();

	return (
		<div className="min-h-screen">
			<div>
				<SidebarMobile />
				<Sidebar />

				<Flex direction="col" className="flex-1 md:pl-64">
					<Nav />

					<main className="flex-1">{children}</main>
				</Flex>
			</div>
		</div>
	);
};

export * from "./Container";
