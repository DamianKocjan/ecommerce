import { MagnifyingGlass, X } from "@phosphor-icons/react";
import type { UseEmojiPickerType } from "@udecode/plate-emoji";

export type EmojiPickerSearchAndClearProps = Pick<
	UseEmojiPickerType,
	"clearSearch" | "i18n" | "searchValue"
>;

export function EmojiPickerSearchAndClear({
	clearSearch,
	i18n,
	searchValue,
}: EmojiPickerSearchAndClearProps) {
	return (
		<>
			<span className="absolute left-2 top-1/2 z-10 flex size-5 -translate-y-1/2">
				<MagnifyingGlass />
			</span>
			{searchValue && (
				<button
					aria-label="Clear"
					className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer border-none bg-transparent"
					onClick={clearSearch}
					title={i18n.clear}
					type="button"
				>
					<X className="size-full" />
				</button>
			)}
		</>
	);
}
