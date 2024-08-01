"use client";

import {
	Image,
	Link,
	ListBullets,
	ListNumbers,
	Minus,
	Paragraph,
	Plus,
	Quotes,
	Table,
	TextHFive,
	TextHFour,
	TextHOne,
	TextHSix,
	TextHThree,
	TextHTwo,
	Video,
} from "@phosphor-icons/react";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
	focusEditor,
	insertEmptyElement,
	useEditorRef,
} from "@udecode/plate-common";
import {
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
} from "@udecode/plate-heading";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { ELEMENT_LINK, triggerFloatingLink } from "@udecode/plate-link";
import { toggleList } from "@udecode/plate-list";
import {
	ELEMENT_IMAGE,
	ELEMENT_MEDIA_EMBED,
	insertMedia,
} from "@udecode/plate-media";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { ELEMENT_TABLE, insertTable } from "@udecode/plate-table";
import React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

const items = [
	{
		items: [
			{
				description: "Paragraph",
				icon: Paragraph,
				label: "Paragraph",
				value: ELEMENT_PARAGRAPH,
			},
			{
				description: "Heading 1",
				icon: TextHOne,
				label: "Heading 1",
				value: ELEMENT_H1,
			},
			{
				description: "Heading 2",
				icon: TextHTwo,
				label: "Heading 2",
				value: ELEMENT_H2,
			},
			{
				description: "Heading 3",
				icon: TextHThree,
				label: "Heading 3",
				value: ELEMENT_H3,
			},
			{
				description: "Heading 4",
				icon: TextHFour,
				label: "Heading 4",
				value: ELEMENT_H4,
			},
			{
				description: "Heading 5",
				icon: TextHFive,
				label: "Heading 5",
				value: ELEMENT_H5,
			},
			{
				description: "Heading 6",
				icon: TextHSix,
				label: "Heading 6",
				value: ELEMENT_H6,
			},
			{
				description: "Quote (⌘+⇧+.)",
				icon: Quotes,
				label: "Quote",
				value: ELEMENT_BLOCKQUOTE,
			},
			{
				description: "Table",
				icon: Table,
				label: "Table",
				value: ELEMENT_TABLE,
			},
			{
				description: "Bulleted list",
				icon: ListBullets,
				label: "Bulleted list",
				value: "ul",
			},
			{
				description: "Numbered list",
				icon: ListNumbers,
				label: "Numbered list",
				value: "ol",
			},
			{
				description: "Divider (---)",
				icon: Minus,
				label: "Divider",
				value: ELEMENT_HR,
			},
		],
		label: "Basic blocks",
	},
	{
		label: "Media",
		items: [
			{
				value: ELEMENT_IMAGE,
				label: "Image",
				description: "Image",
				icon: Image,
			},
			{
				value: ELEMENT_MEDIA_EMBED,
				label: "Embed",
				description: "Embed",
				icon: Video,
			},
		],
	},
	{
		label: "Inline",
		items: [
			{
				value: ELEMENT_LINK,
				label: "Link",
				description: "Link",
				icon: Link,
			},
		],
	},
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
	const editor = useEditorRef();
	const openState = useOpenState();

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton isDropdown pressed={openState.open} tooltip="Insert">
					<Plus />
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="start"
				className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
			>
				{items.map(({ items: nestedItems, label }, index) => (
					<React.Fragment key={label}>
						{index !== 0 && <DropdownMenuSeparator />}

						<DropdownMenuLabel>{label}</DropdownMenuLabel>
						{nestedItems.map(
							({ icon: Icon, label: itemLabel, value: type }) => (
								<DropdownMenuItem
									className="min-w-[180px]"
									key={type}
									onSelect={() => {
										switch (type) {
											case ELEMENT_IMAGE: {
												void insertMedia(editor, { type: ELEMENT_IMAGE });

												break;
											}
											case ELEMENT_MEDIA_EMBED: {
												void insertMedia(editor, {
													type: ELEMENT_MEDIA_EMBED,
												});

												break;
											}
											case "ul":
											case "ol": {
												insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
													select: true,
													nextBlock: true,
												});
												toggleList(editor, { type });

												break;
											}
											case ELEMENT_TABLE: {
												insertTable(editor);

												break;
											}
											case ELEMENT_LINK: {
												triggerFloatingLink(editor, { focused: true });

												break;
											}
											default: {
												insertEmptyElement(editor, type, {
													nextBlock: true,
													select: true,
												});
											}
										}

										focusEditor(editor);
									}}
								>
									<Icon className="mr-2 size-5" />
									{itemLabel}
								</DropdownMenuItem>
							),
						)}
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
