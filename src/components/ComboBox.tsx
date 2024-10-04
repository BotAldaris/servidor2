import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	Command,
} from "@/components/ui/command";
import { ChevronsUpDown, CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface escolhas {
	value: string;
	label: string;
}
interface IProps<T> {
	menssageInput: string;
	menssageSearch: string;
	messageEmpty: string;
	escolhas: escolhas[];
	value: T;
	setValue: (valor: string) => void;
	menssageLabel: string;
}
export default function Combobox<T>(props: IProps<T>) {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<p>{props.menssageLabel}</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{props.value
							? props.escolhas.find(
									(framework) => framework.value === props.value,
								)?.label
							: props.menssageInput}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder={props.menssageSearch} />
						<CommandList>
							<CommandEmpty>{props.messageEmpty}</CommandEmpty>
							<CommandGroup>
								{props.escolhas.map((escolha) => (
									<CommandItem
										key={`${escolha.value}`}
										value={`${escolha.value}`}
										onSelect={(currentValue) => {
											props.setValue(
												currentValue === props.value ? "" : currentValue,
											);
											setOpen(false);
										}}
									>
										<CheckIcon
											className={cn(
												"mr-2 h-4 w-4",
												props.value === escolha.value
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{escolha.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
