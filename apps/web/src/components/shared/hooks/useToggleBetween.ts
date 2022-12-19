import { useCallback, useMemo, useState } from "react";

export function useToggleBetween<T>(list: T[]) {
	const [index, setIndex] = useState(0);
	const value = useMemo(() => list[index], [index, list]);
	const listLength = useMemo(() => list.length, [list]);

	const next = useCallback(
		() => setIndex((i) => (i + 1) % listLength),
		[listLength]
	);

	return [value, next] as const;
}
