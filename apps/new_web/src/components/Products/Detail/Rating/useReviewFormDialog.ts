import { create } from "zustand";

interface ReviewFormDialogState {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const useReviewFormDialog = create<ReviewFormDialogState>((set) => ({
	open: false,
	setOpen: (open) => set({ open }),
}));
