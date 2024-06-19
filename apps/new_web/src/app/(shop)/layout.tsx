"use client";

import { BagProvider } from "~/contexts/bag-context";
import { Analytics } from "./analytics";
import { SiteHeader } from "./site-header";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<BagProvider>
			<SiteHeader />
			<div className="flex-1">{children}</div>
			<Analytics />
		</BagProvider>
	);
}
