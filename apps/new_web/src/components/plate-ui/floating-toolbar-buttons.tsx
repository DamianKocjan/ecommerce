import {
	TextB,
	TextItalic,
	TextStrikethrough,
	TextUnderline,
} from "@phosphor-icons/react";
import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";

import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { ToolbarSeparator } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
	const readOnly = useEditorReadOnly();

	return (
		<>
			{!readOnly && (
				<>
					<TurnIntoDropdownMenu />

					<MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
						<TextB />
					</MarkToolbarButton>
					<MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
						<TextItalic />
					</MarkToolbarButton>
					<MarkToolbarButton
						nodeType={MARK_UNDERLINE}
						tooltip="Underline (⌘+U)"
					>
						<TextUnderline />
					</MarkToolbarButton>
					<MarkToolbarButton
						nodeType={MARK_STRIKETHROUGH}
						tooltip="Strikethrough (⌘+⇧+M)"
					>
						<TextStrikethrough />
					</MarkToolbarButton>

					<ToolbarSeparator />

					<LinkToolbarButton />
				</>
			)}

			<MoreDropdownMenu />
		</>
	);
}
