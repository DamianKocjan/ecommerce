import create from "zustand";

interface CategoryMenuOpenState {
	categoryMenuOpen: string | null;
	setCategoryMenuOpen: (menu: string | null) => void;
}

const store = create<CategoryMenuOpenState>((set) => ({
	categoryMenuOpen: null,
	setCategoryMenuOpen: (menu) => set(() => ({ categoryMenuOpen: menu })),
}));

export function useCategoryMenuOpen() {
	const categoryMenuOpen = store((state) => state.categoryMenuOpen);
	const { setCategoryMenuOpen } = store();

	return {
		categoryMenuOpen,
		setCategoryMenuOpen,
	};
}
