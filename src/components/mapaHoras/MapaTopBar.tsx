import { Button } from "@/components/ui/button";

import DatePicker from "../datePicker";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { addDays, type Duration, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import TempoTotalCard from "./TempoTotalCard";

interface IProps {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	duracao: Duration;
}

export default function MapaTopBar(props: IProps) {
	const navigate = useNavigate();
	return (
		<div className="flex flex-row justify-around content-center	">
			<div />
			<div>
				<Button
					variant="outline"
					size="icon"
					onClick={() => props.setDate(subDays(props.date ?? new Date(), 1))}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<DatePicker date={props.date ?? new Date()} setDate={props.setDate} />
				<Button
					variant="outline"
					size="icon"
					onClick={() => props.setDate(addDays(props.date ?? new Date(), 1))}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() =>
						navigate("/ops/mapahoras/adicionar", { replace: false })
					}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
			<TempoTotalCard duracao={props.duracao} />
		</div>
	);
}
