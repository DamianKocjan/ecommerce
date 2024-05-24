"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { showErrorToast } from "~/lib/handle-error";

export function UserNav({ session }: { session: Session }) {
	const [isLoading, setIsLoading] = React.useState(false);

	async function handleSignOut() {
		try {
			setIsLoading(true);
			await signOut();
		} catch (error) {
			console.error("Failed to sign out", error);
			showErrorToast(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={session.user?.image || undefined}
							alt={session.user?.name || session.user?.email || "User"}
						/>
						<AvatarFallback>
							{session.user?.name
								? session.user.name[0]!.toUpperCase() +
									session.user.name[1]!.toUpperCase()
								: session.user?.email
									? session.user?.email[0]!.toUpperCase() +
										session.user?.email[1]!.toUpperCase()
									: session.user.id}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{session.user?.name || session.user?.email || "User"}
						</p>
						<p className="text-muted-foreground text-xs leading-none">
							{session.user?.email || "No email"}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{session.user.role === "ADMIN" ? (
						<Link href="/dashboard">
							<DropdownMenuItem>Dashboard</DropdownMenuItem>
						</Link>
					) : null}
					<Link href="/wishlist">
						<DropdownMenuItem>Wishlist</DropdownMenuItem>
					</Link>{" "}
					<Link href="/settings">
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
