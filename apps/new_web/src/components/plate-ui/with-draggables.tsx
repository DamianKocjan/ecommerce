import type { FC } from "react";

import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
	createNodesWithHOC,
	PlatePluginComponent,
} from "@udecode/plate-common";
import {
	type WithDraggableOptions,
	withDraggable as withDraggablePrimitive,
} from "@udecode/plate-dnd";
import {
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
} from "@udecode/plate-heading";
import { ELEMENT_OL, ELEMENT_UL } from "@udecode/plate-list";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import {
	ELEMENT_IMAGE,
	ELEMENT_MEDIA,
	ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import { Draggable, type DraggableProps } from "./draggable";

export const withDraggable = (
	Component: FC,
	options?: WithDraggableOptions<
		Partial<Omit<DraggableProps, "children" | "editor" | "element">>
	>,
) =>
	withDraggablePrimitive<DraggableProps>(
		Draggable,
		Component,
		options as WithDraggableOptions<DraggableProps>,
	);

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

export const withDraggables = (components: unknown) => {
	return withDraggablesPrimitive(components, [
		{
			keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL, ELEMENT_HR],
			level: 0,
		},
		{
			draggableProps: {
				classNames: {
					blockToolbarWrapper: "h-[1.3em]",
					gutterLeft: "px-0 pb-1 text-[1.875em]",
				},
			},
			key: ELEMENT_H1,
		},
		{
			draggableProps: {
				classNames: {
					blockToolbarWrapper: "h-[1.3em]",
					gutterLeft: "px-0 pb-1 text-[1.5em]",
				},
			},
			key: ELEMENT_H2,
		},
		{
			draggableProps: {
				classNames: {
					blockToolbarWrapper: "h-[1.3em]",
					gutterLeft: "pt-[2px] px-0 pb-1 text-[1.25em]",
				},
			},
			key: ELEMENT_H3,
		},
		{
			draggableProps: {
				classNames: {
					blockToolbarWrapper: "h-[1.3em]",
					gutterLeft: "pt-[3px] px-0 pb-0 text-[1.1em]",
				},
			},
			keys: [ELEMENT_H4, ELEMENT_H5],
		},
		{
			draggableProps: {
				classNames: {
					gutterLeft: "pt-[3px] px-0 pb-0",
				},
			},
			keys: [
				ELEMENT_PARAGRAPH,
				ELEMENT_HR,
				ELEMENT_MEDIA,
				ELEMENT_IMAGE,
				ELEMENT_MEDIA_EMBED,
			],
		},
		{
			draggableProps: {
				classNames: {
					gutterLeft: "px-0 pb-0",
				},
			},
			keys: [ELEMENT_H6, ELEMENT_UL, ELEMENT_OL],
		},
		{
			draggableProps: {
				classNames: {
					gutterLeft: "px-0 pb-0",
				},
			},
			key: ELEMENT_BLOCKQUOTE,
		},
	]) as Record<string, PlatePluginComponent<unknown>>;
};
