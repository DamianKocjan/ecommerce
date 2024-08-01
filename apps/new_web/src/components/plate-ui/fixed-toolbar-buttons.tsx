import {
	PaintBucket,
	TextAUnderline,
	TextBolder,
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
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { ELEMENT_OL, ELEMENT_UL } from "@udecode/plate-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";

import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { iconVariants } from "./icons";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
import { LinkToolbarButton } from "./link-toolbar-button";
import { ListToolbarButton } from "./list-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MediaToolbarButton } from "./media-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { TableDropdownMenu } from "./table-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
	const readOnly = useEditorReadOnly();

	return (
		<div className="w-full overflow-hidden">
			<div
				className="flex flex-wrap"
				style={{
					transform: "translateX(calc(-1px))",
				}}
			>
				{!readOnly && (
					<>
						<ToolbarGroup noSeparator>
							<InsertDropdownMenu />
							<TurnIntoDropdownMenu />
						</ToolbarGroup>

						<ToolbarGroup>
							<MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
								<TextBolder />
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

							<ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
								<TextAUnderline
									className={iconVariants({ variant: "toolbar" })}
								/>
							</ColorDropdownMenu>
							<ColorDropdownMenu
								nodeType={MARK_BG_COLOR}
								tooltip="Highlight Color"
							>
								<PaintBucket className={iconVariants({ variant: "toolbar" })} />
							</ColorDropdownMenu>
						</ToolbarGroup>

						<ToolbarGroup>
							<AlignDropdownMenu />
							<LineHeightDropdownMenu />
							<ListToolbarButton nodeType={ELEMENT_UL} />
							<ListToolbarButton nodeType={ELEMENT_OL} />
						</ToolbarGroup>

						<ToolbarGroup>
							<LinkToolbarButton />
							<MediaToolbarButton nodeType={ELEMENT_IMAGE} />
							<TableDropdownMenu />
							<EmojiDropdownMenu />

							<MoreDropdownMenu />
						</ToolbarGroup>
					</>
				)}

				<div className="grow" />

				<ToolbarGroup noSeparator>
					<ModeDropdownMenu />
				</ToolbarGroup>
			</div>
		</div>
	);
}
