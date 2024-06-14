import React from "react";

export function useDelayedHover(
	callback: (e: React.MouseEvent) => void,
	delay = 1000,
) {
	const [delayHandler, setDelayHandler] = React.useState<NodeJS.Timeout | null>(
		null,
	);

	const handleMouseEnter = React.useCallback(
		(e: React.MouseEvent) => {
			setDelayHandler(setTimeout(() => callback(e), delay));
		},
		[callback, delay],
	);

	const handleMouseLeave = React.useCallback(() => {
		if (!delayHandler) {
			return;
		}
		clearTimeout(delayHandler);
	}, [delayHandler]);

	return [handleMouseEnter, handleMouseLeave] as const;
}
