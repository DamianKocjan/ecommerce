"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

import { trpc } from "~/utils/trpc";
import { TooltipProvider } from "../components/ui/tooltip";

export const Providers = trpc.withTRPC(
	({ children }: { children: React.ReactNode }) => (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<TooltipProvider>
				<SessionProvider>{children}</SessionProvider>
			</TooltipProvider>
		</ThemeProvider>
	),
);
