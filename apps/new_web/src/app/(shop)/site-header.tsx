"use client";

import { useSession } from "next-auth/react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import { BagDropdown } from "./bag-dropdown";
import { UserNav } from "./user-nav";

export function SiteHeader() {
	const { data: session } = useSession();

	return (
		<header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<MainNav />
				<MobileNav />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center space-x-2">
						<BagDropdown session={session} />

						{session ? (
							<UserNav session={session} />
						) : (
							<Link
								href="/login"
								className="text-accent-9 hover:text-accent-11 transition-colors duration-150"
							>
								Sign In
							</Link>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}

const LINKS = [
	{ title: "Women", href: "/c/women" },
	{ title: "Men", href: "/c/men" },
	{ title: "Kids", href: "/c/kids" },
];

function MainNav() {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex">
			<Link href="/" className="mr-6 flex items-center space-x-2">
				<span className="font-bold">Ecommerce</span>
			</Link>
			<nav className="flex items-center gap-6 text-sm">
				<Link
					href="/"
					className={cn(
						"hover:text-foreground/80 transition-colors",
						pathname === "/" ? "text-foreground" : "text-foreground/60",
					)}
				>
					Home
				</Link>

				{LINKS.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							"hover:text-foreground/80 transition-colors",
							pathname?.startsWith(link.href)
								? "text-foreground"
								: "text-foreground/60",
						)}
					>
						{link.title}
					</Link>
				))}
			</nav>
		</div>
	);
}

function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<svg
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
					>
						<path
							d="M3 5H11"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
						<path
							d="M3 12H16"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
						<path
							d="M3 19H21"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="pr-0">
				<MobileLink
					href="/"
					className="flex items-center"
					onOpenChange={setOpen}
				>
					<span className="font-bold">Ecommerce</span>
				</MobileLink>
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						{LINKS.map(
							(item) =>
								item.href && (
									<MobileLink
										key={item.href}
										href={item.href}
										onOpenChange={setOpen}
									>
										{item.title}
									</MobileLink>
								),
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn(className)}
			{...props}
		>
			{children}
		</Link>
	);
}
