"use client";

import { withProps } from "@udecode/cn";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
	createBoldPlugin,
	createItalicPlugin,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createUnderlinePlugin,
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_SUBSCRIPT,
	MARK_SUPERSCRIPT,
	MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
	createBlockquotePlugin,
	ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
	createExitBreakPlugin,
	createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
	createPlateEditor,
	createPlugins,
	Plate,
	PlateElement,
	PlateLeaf,
	PlatePlugin,
	RenderAfterEditable,
} from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import {
	createFontBackgroundColorPlugin,
	createFontColorPlugin,
	createFontSizePlugin,
} from "@udecode/plate-font";
import {
	createHeadingPlugin,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
	KEYS_HEADING,
} from "@udecode/plate-heading";
import {
	createHighlightPlugin,
	MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import {
	createHorizontalRulePlugin,
	ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createJuicePlugin } from "@udecode/plate-juice";
import {
	createColumnPlugin,
	ELEMENT_COLUMN,
	ELEMENT_COLUMN_GROUP,
} from "@udecode/plate-layout";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
	createListPlugin,
	ELEMENT_LI,
	ELEMENT_OL,
	ELEMENT_UL,
} from "@udecode/plate-list";
import {
	createImagePlugin,
	createMediaEmbedPlugin,
	ELEMENT_IMAGE,
	ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import {
	createParagraphPlugin,
	ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createDeletePlugin } from "@udecode/plate-select";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
// import { serializeHtml } from "@udecode/plate-serializer-html";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import {
	createTablePlugin,
	ELEMENT_TABLE,
	ELEMENT_TD,
	ELEMENT_TH,
	ELEMENT_TR,
} from "@udecode/plate-table";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BlockquoteElement } from "~/components/plate-ui/blockquote-element";
import { ColumnElement } from "~/components/plate-ui/column-element";
import { ColumnGroupElement } from "~/components/plate-ui/column-group-element";
import { Editor } from "~/components/plate-ui/editor";
import { FixedToolbar } from "~/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "~/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "~/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "~/components/plate-ui/floating-toolbar-buttons";
import { HeadingElement } from "~/components/plate-ui/heading-element";
import { HighlightLeaf } from "~/components/plate-ui/highlight-leaf";
import { HrElement } from "~/components/plate-ui/hr-element";
import { ImageElement } from "~/components/plate-ui/image-element";
import { LinkElement } from "~/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "~/components/plate-ui/link-floating-toolbar";
import { ListElement } from "~/components/plate-ui/list-element";
import { MediaEmbedElement } from "~/components/plate-ui/media-embed-element";
import { ParagraphElement } from "~/components/plate-ui/paragraph-element";
import { withPlaceholders } from "~/components/plate-ui/placeholder";
import {
	TableCellElement,
	TableCellHeaderElement,
} from "~/components/plate-ui/table-cell-element";
import { TableElement } from "~/components/plate-ui/table-element";
import { TableRowElement } from "~/components/plate-ui/table-row-element";
import { withDraggables } from "~/components/plate-ui/with-draggables";

const plugins = createPlugins(
	[
		createParagraphPlugin(),
		createBlockquotePlugin(),
		createHorizontalRulePlugin(),
		createLinkPlugin({
			renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
		}),
		createImagePlugin(),
		createColumnPlugin(),
		createHeadingPlugin(),
		createListPlugin(),
		createMediaEmbedPlugin(),
		createCaptionPlugin({
			options: {
				pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
			},
		}),
		createTablePlugin(),
		createBoldPlugin(),
		createItalicPlugin(),
		createUnderlinePlugin(),
		createStrikethroughPlugin(),
		createSubscriptPlugin(),
		createSuperscriptPlugin(),
		createFontColorPlugin(),
		createFontBackgroundColorPlugin(),
		createFontSizePlugin(),
		createHighlightPlugin(),
		createAlignPlugin({
			inject: {
				props: {
					validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
				},
			},
		}),
		createIndentPlugin({
			inject: {
				props: {
					validTypes: [
						ELEMENT_PARAGRAPH,
						ELEMENT_H1,
						ELEMENT_H2,
						ELEMENT_H3,
						ELEMENT_BLOCKQUOTE,
					],
				},
			},
		}),
		createLineHeightPlugin({
			inject: {
				props: {
					defaultNodeValue: 1.5,
					validNodeValues: [1, 1.2, 1.5, 2, 3],
					validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
				},
			},
		}),
		createAutoformatPlugin({
			options: {
				rules: [
					// Usage: https://platejs.org/docs/autoformat
				],
				enableUndoOnDelete: true,
			},
		}),
		createBlockSelectionPlugin({
			options: {
				sizes: {
					top: 0,
					bottom: 0,
				},
			},
		}),
		createDndPlugin({
			options: { enableScroller: true },
		}),
		createEmojiPlugin(),
		createExitBreakPlugin({
			options: {
				rules: [
					{
						hotkey: "mod+enter",
					},
					{
						hotkey: "mod+shift+enter",
						before: true,
					},
					{
						hotkey: "enter",
						query: {
							start: true,
							end: true,
							allow: KEYS_HEADING,
						},
						relative: true,
						level: 1,
					},
				],
			},
		}),
		createNodeIdPlugin(),
		createResetNodePlugin({
			options: {
				rules: [
					// Usage: https://platejs.org/docs/reset-node
				],
			},
		}),
		createDeletePlugin(),
		createSoftBreakPlugin({
			options: {
				rules: [
					{ hotkey: "shift+enter" },
					{
						hotkey: "enter",
						query: {
							allow: [ELEMENT_BLOCKQUOTE, ELEMENT_TD],
						},
					},
				],
			},
		}),
		createTabbablePlugin(),
		createTrailingBlockPlugin({
			options: { type: ELEMENT_PARAGRAPH },
		}),
		createDeserializeDocxPlugin(),
		createDeserializeCsvPlugin(),
		createDeserializeMdPlugin(),
		createJuicePlugin(),
	] as PlatePlugin[],
	{
		components: withDraggables(
			withPlaceholders({
				[ELEMENT_BLOCKQUOTE]: BlockquoteElement,
				[ELEMENT_HR]: HrElement,
				[ELEMENT_IMAGE]: ImageElement,
				[ELEMENT_LINK]: LinkElement,
				[ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
				[ELEMENT_COLUMN]: ColumnElement,
				[ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
				[ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
				[ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
				[ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
				[ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
				[ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
				[ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
				[ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
				[ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
				[ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
				[ELEMENT_PARAGRAPH]: ParagraphElement,
				[ELEMENT_TABLE]: TableElement,
				[ELEMENT_TR]: TableRowElement,
				[ELEMENT_TD]: TableCellElement,
				[ELEMENT_TH]: TableCellHeaderElement,
				[MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
				[MARK_HIGHLIGHT]: HighlightLeaf,
				[MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
				[MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
				[MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
				[MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
				[MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
			}),
		),
	},
);

const initialValue = [
	{
		id: "1",
		type: "p",
		children: [{ text: "Hello, World!" }],
	},
];

const test = [
	{
		id: "1",
		type: "p",
		children: [
			{
				text: "Hello, World!",
				backgroundColor: "#FCE4CD",
			},
		],
	},
	{
		id: "fz9sn",
		type: "p",
		children: [
			{
				text: "awdwdadwa",
				color: "#000000",
				backgroundColor: "#FFFFFF",
			},
		],
	},
	{
		id: "3n8hx",
		type: "p",
		children: [
			{
				text: "awdwdadw",
			},
		],
	},
	{
		id: "wxjks",
		type: "p",
		children: [
			{
				text: "",
			},
		],
	},
	{
		id: "dwxef",
		type: "p",
		children: [
			{
				text: "dadwadwa",
			},
		],
	},
	{
		children: [
			{
				text: "",
			},
		],
		type: "img",
		url: "https://a.allegroimg.com/s180/11364b/658720f64f019a83ef3b1658ba35/Samsung-Galaxy-A15-4-128-GB-czarny",
		width: 220,
		caption: [
			{
				text: "waddwaawddaw",
			},
		],
		id: "ebap3",
	},
	{
		children: [
			{
				text: "",
			},
		],
		type: "hr",
		id: "jwnwc",
	},
	{
		id: "aqx6q",
		type: "p",
		children: [
			{
				text: "awdadwdd",
			},
		],
	},
	{
		id: "q4zcp",
		type: "p",
		children: [
			{
				text: "",
			},
		],
	},
];

const editor = createPlateEditor({
	id: "plate-editor",
	plugins,
	normalizeInitialValue: true,
});

export function PlateEditor() {
	const [value, setValue] = React.useState(test);

	// const html = serializeHtml(editor, { nodes: value });

	return (
		<DndProvider backend={HTML5Backend}>
			<Plate
				plugins={plugins}
				normalizeInitialValue
				value={value}
				onChange={(value) => {
					setValue(value);
				}}
			>
				<FixedToolbar>
					<FixedToolbarButtons />
				</FixedToolbar>

				<Editor />

				<FloatingToolbar>
					<FloatingToolbarButtons />
				</FloatingToolbar>
			</Plate>
		</DndProvider>
	);
}
