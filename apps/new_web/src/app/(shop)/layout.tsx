"use client";

import { SiteHeader } from "./site-header";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<SiteHeader />
			<div className="flex-1">{children}</div>
		</>
	);
}
