import React, { useCallback, useState } from "react";

export function useDelayedHover(
	callback: (e: React.MouseEvent) => void,
	delay = 1000,
) {
	const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | null>(null);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent) => {
			setDelayHandler(setTimeout(() => callback(e), delay));
		},
		[callback, delay],
	);

	const handleMouseLeave = useCallback(() => {
		if (!delayHandler) {
			return;
		}
		clearTimeout(delayHandler);
	}, [delayHandler]);

	return [handleMouseEnter, handleMouseLeave] as const;
}
