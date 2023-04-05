import { create } from "zustand";

interface SidebarState {
	isOpen: boolean;
	close: () => void;
	open: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
	isOpen: false,
	close: () => set(() => ({ isOpen: false })),
	open: () => set(() => ({ isOpen: true })),
}));
