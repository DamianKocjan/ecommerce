import { Eye, PencilSimple } from "@phosphor-icons/react";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
	focusEditor,
	useEditorReadOnly,
	useEditorRef,
	usePlateStore,
} from "@udecode/plate-common";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function ModeDropdownMenu(props: DropdownMenuProps) {
	const editor = useEditorRef();
	const setReadOnly = usePlateStore().set.readOnly();
	const readOnly = useEditorReadOnly();
	const openState = useOpenState();

	const item = {
		editing: (
			<>
				<PencilSimple className="mr-2 size-5" />
				<span className="hidden lg:inline">Editing</span>
			</>
		),
		viewing: (
			<>
				<Eye className="mr-2 size-5" />
				<span className="hidden lg:inline">Viewing</span>
			</>
		),
	};

	let value: keyof typeof item = "editing";

	if (readOnly) value = "viewing";

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton
					className="min-w-[auto] lg:min-w-[130px]"
					isDropdown
					pressed={openState.open}
					tooltip="Editing mode"
				>
					{item[value]}
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="min-w-[180px]">
				<DropdownMenuRadioGroup
					className="flex flex-col gap-0.5"
					onValueChange={(newValue) => {
						if (newValue !== "viewing") {
							setReadOnly(false);
						}
						if (newValue === "viewing") {
							setReadOnly(true);

							return;
						}
						if (newValue === "editing") {
							focusEditor(editor);

							return;
						}
					}}
					value={value}
				>
					<DropdownMenuRadioItem value="editing">
						{item.editing}
					</DropdownMenuRadioItem>

					<DropdownMenuRadioItem value="viewing">
						{item.viewing}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
