import React from "react";
import { Nav } from "./Nav";
import { SubNav } from "./SubNav";

export interface ShopLayoutProps {
	children: React.ReactNode;
}

export const ShopLayout: React.FC<ShopLayoutProps> = ({ children }) => {
	return (
		<>
			<Nav />
			<SubNav />

			<main>{children}</main>
		</>
	);
};

export * from "./Container";
