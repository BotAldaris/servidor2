import { Button } from "@/components/ui/button";

import DatePicker from "../datePicker";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
	addDays,
	addHours,
	type Duration,
	intervalToDuration,
	subDays,
} from "date-fns";
import TempoTotalCard from "./TempoTotalCard";
import type IMapaHora from "@/types/mapaHoras";
import { useNavigate } from "@tanstack/react-router";

interface IProps {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	dados: IMapaHora[] | undefined;
}

function mapaParaDuracao(dados: IMapaHora[], dataI: Date): Duration {
	let total = 0;
	for (const mapa of dados) {
		total += mapa.valorCorte;
	}
	return intervalToDuration({
		start: dataI,
		end: addHours(dataI, total / 500),
	});
}

export default function MapaTopBar(props: IProps) {
	if (props.dados === undefined) {
		return;
	}
	const navigate = useNavigate();
	const duracao = mapaParaDuracao(props.dados, props.date ?? new Date());
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
						navigate({ to: "/ops/mapahoras/adicionar", replace: false })
					}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
			<TempoTotalCard duracao={duracao} />
		</div>
	);
}
