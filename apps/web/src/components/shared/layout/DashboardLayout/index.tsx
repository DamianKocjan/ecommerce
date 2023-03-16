import React from "react";
import { Flex } from "../../core/Flex";
import { Nav } from "./Nav";
import { Sidebar, SidebarMobile } from "./Sidebar";

export interface DashboardLayoutProps {
	children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	children,
}) => {
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
