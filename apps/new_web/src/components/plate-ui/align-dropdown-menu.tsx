"use client";

import {
	TextAlignCenter,
	TextAlignJustify,
	TextAlignLeft,
	TextAlignRight,
} from "@phosphor-icons/react";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
	useAlignDropdownMenu,
	useAlignDropdownMenuState,
} from "@udecode/plate-alignment";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	useOpenState,
} from "./dropdown-menu";
import { iconVariants } from "./icons";
import { ToolbarButton } from "./toolbar";

const items = [
	{
		icon: TextAlignLeft,
		value: "left",
	},
	{
		icon: TextAlignCenter,
		value: "center",
	},
	{
		icon: TextAlignRight,
		value: "right",
	},
	{
		icon: TextAlignJustify,
		value: "justify",
	},
];

export function AlignDropdownMenu({ children, ...props }: DropdownMenuProps) {
	const state = useAlignDropdownMenuState();
	const { radioGroupProps } = useAlignDropdownMenu(state);

	const openState = useOpenState();
	const IconValue =
		items.find((item) => item.value === radioGroupProps.value)?.icon ??
		TextAlignLeft;

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton isDropdown pressed={openState.open} tooltip="Align">
					<IconValue />
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="min-w-0">
				<DropdownMenuRadioGroup
					className="flex flex-col gap-0.5"
					{...radioGroupProps}
				>
					{items.map(({ icon: Icon, value: itemValue }) => (
						<DropdownMenuRadioItem hideIcon key={itemValue} value={itemValue}>
							<Icon className={iconVariants({ variant: "toolbar" })} />
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
