import { useCallback, useSyncExternalStore } from "react";
import { PER_PAGE } from "./PerPage";

function getSnapshot() {
	return Number(window.localStorage.getItem("perPage")) ?? PER_PAGE[0];
}

function getServerSnapshot() {
	return PER_PAGE[0];
}

function subscribe(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	return () => window.removeEventListener("storage", onStoreChange);
}

export function usePerPage() {
	const perPage = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	const handlePerPageChange = useCallback((value: number) => {
		window.localStorage.setItem("perPage", value.toString());
		// When `perPage` item exists in local storage, `storage` event won't fire.
		// So we need to manually trigger it
		window.dispatchEvent(new Event("storage"));
	}, []);

	return [perPage, handlePerPageChange] as const;
}
