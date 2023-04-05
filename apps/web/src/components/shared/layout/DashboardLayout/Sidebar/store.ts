import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { create } from "zustand";

export type Path = "HOME" | "SALES" | "PRODUCTS" | "REVIEWS" | "REPORTS";

interface SidebarState {
	isOpen: boolean;
	close: () => void;
	open: () => void;
	currentPath: Path;
	setCurrentPath: (path: Path) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
	isOpen: false,
	close: () => set(() => ({ isOpen: false })),
	open: () => set(() => ({ isOpen: true })),
	currentPath: "HOME",
	setCurrentPath: (path: Path) => set(() => ({ currentPath: path })),
}));

export function useCurrentPath() {
	const setCurrentPath = useSidebar((state) => state.setCurrentPath);
	const router = useRouter();

	const handleRouteChange = useCallback(
		(url: string) => {
			if (url.includes("/dashboard/sales")) {
				setCurrentPath("SALES");
			} else if (url.includes("/dashboard/products")) {
				setCurrentPath("PRODUCTS");
			} else if (url.includes("/dashboard/reviews")) {
				setCurrentPath("REVIEWS");
			} else if (url.includes("/dashboard/reports")) {
				setCurrentPath("REPORTS");
			} else {
				setCurrentPath("HOME");
			}
		},
		[setCurrentPath],
	);

	useEffect(() => {
		handleRouteChange(router.pathname);
	}, [handleRouteChange, router]);
}
