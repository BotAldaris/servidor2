import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface IProps {
	date: Date;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function DatePicker(props: IProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!props.date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{props.date ? format(props.date, "PPP") : <span>Es</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={props.date}
					onSelect={props.setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
