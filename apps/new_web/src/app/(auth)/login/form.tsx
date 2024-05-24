"use client";

import { GoogleLogo } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showErrorToast } from "~/lib/handle-error";

export function UserAuthForm() {
	const [isLoading, setIsLoading] = React.useState(false);

	async function handleGoogleSignIn() {
		try {
			setIsLoading(true);
			await signIn("google");
		} catch (error) {
			console.error(error);
			showErrorToast(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="grid gap-6">
			<form>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled
						/>
					</div>
					<Button disabled>
						{/* {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
						Sign In with Email
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background text-muted-foreground px-2">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" onClick={handleGoogleSignIn}>
				{isLoading ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<GoogleLogo className="mr-2 h-4 w-4" />
				)}{" "}
				Google
			</Button>
		</div>
	);
}
