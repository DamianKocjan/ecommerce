"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { trpc } from "~/utils/trpc";
import { TooltipProvider } from "./ui/tooltip";

function _ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<TooltipProvider>
				<SessionProvider session={props.session}>{children}</SessionProvider>
			</TooltipProvider>
		</NextThemesProvider>
	);
}

export const ThemeProvider = trpc.withTRPC(_ThemeProvider);
