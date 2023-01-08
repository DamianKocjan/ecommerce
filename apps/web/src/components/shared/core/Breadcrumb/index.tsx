import Link from "next/link";
import React from "react";

interface BreadcrumbLinkProps {
	href: string;
	children: React.ReactNode;
	disabled?: boolean;
}

const BreadcrumbLink = ({ href, children, disabled }: BreadcrumbLinkProps) => {
	if (disabled) {
		return (
			<span
				className="hidden select-none text-slate-400 sm:block"
				aria-hidden="true"
			>
				{children}
			</span>
		);
	}
	return (
		<Link href={href} legacyBehavior>
			<a className="hidden text-slate-600 sm:block">{children}</a>
		</Link>
	);
};

const BreadcrumbDivider = () => {
	return (
		<div
			aria-hidden="true"
			className="hidden select-none text-slate-400 sm:block"
		>
			/
		</div>
	);
};

export interface BreadcrumbProps {
	children: React.ReactNode;
}

export type Breadcrumb = React.FC<BreadcrumbProps> & {
	Link: typeof BreadcrumbLink;
	Divider: typeof BreadcrumbDivider;
};

export const Breadcrumb: Breadcrumb = ({ children }: BreadcrumbProps) => {
	return (
		<nav
			aria-label="Breadcrumbs"
			className="order-first flex text-sm font-semibold sm:space-x-2"
		>
			{children}
		</nav>
	);
};

Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Divider = BreadcrumbDivider;
