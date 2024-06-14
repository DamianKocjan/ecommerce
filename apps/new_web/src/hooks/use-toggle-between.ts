import React from "react";

export function useToggleBetween<T>(list: T[]) {
	const [index, setIndex] = React.useState(0);
	const value = React.useMemo(() => list[index], [index, list]);
	const listLength = React.useMemo(() => list.length, [list]);

	const next = React.useCallback(
		() => setIndex((i) => (i + 1) % listLength),
		[listLength],
	);

	return [value, next] as const;
}
