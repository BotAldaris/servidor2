import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type IMapaHora from "@/types/mapaHoras";
import { addHours, intervalToDuration } from "date-fns";
import CelulaCliente from "./CelulaCliente";
import { XIcon } from "lucide-react";
import MapaOpDialog from "./MapaOpDialog";

interface IProps {
	mapa: IMapaHora[];
}

function valorParaHora(data: Date, valor: number) {
	const duration = intervalToDuration({
		start: data,
		end: addHours(data, valor / 500),
	});
	return `${duration.hours === undefined ? "00" : addPaddingStart(duration.hours)}:${duration.minutes === undefined ? "00" : addPaddingStart(duration.minutes)}:${duration.seconds === undefined ? "00" : addPaddingStart(duration.seconds)}`;
}

function addPaddingStart(numero: number) {
	if (numero > 10) {
		return numero.toString();
	}
	return `0${numero}`;
}
export default function MapaTable(props: IProps) {
	const data = new Date();
	return (
		<Table>
			<TableCaption>Uma lista de todas as Ops.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">OP</TableHead>
					<TableHead>Cliente</TableHead>
					<TableHead>Data Liberação</TableHead>
					<TableHead>Data Entrega</TableHead>
					<TableHead>Tipo Serviço</TableHead>
					<TableHead>Valor Corte</TableHead>
					<TableHead>Tempo Corte</TableHead>
					<TableHead>Dobra</TableHead>
					<TableHead>Calderaria</TableHead>
					<TableHead>OBS</TableHead>
					<TableHead className="text-right">Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.mapa.map((mapa) => (
					<TableRow key={mapa.id}>
						<TableCell className="font-medium">
							<MapaOpDialog numero={mapa.numeroOp} tipo="" opId={mapa.opId} />
						</TableCell>
						<CelulaCliente mapa={mapa} text={mapa.cliente} />
						<TableCell>
							{mapa.dataLiberacao
								.toISOString()
								.split("T")[0]
								.split("-")
								.reverse()
								.join("/")}
						</TableCell>
						<TableCell
							className={
								new Date() >= mapa.dataEntrega
									? "animate-pulse bg-destructive"
									: ""
							}
						>
							{mapa.dataEntrega
								.toISOString()
								.split("T")[0]
								.split("-")
								.reverse()
								.join("/")}
						</TableCell>
						<TableCell>{mapa.tipo}</TableCell>
						<TableCell>{mapa.valorCorte}</TableCell>
						<TableCell>{valorParaHora(data, mapa.valorCorte)}</TableCell>
						<TableCell>{mapa.dobra ? <XIcon /> : ""}</TableCell>
						<TableCell>{mapa.calderaria ? <XIcon /> : ""}</TableCell>
						<CelulaCliente mapa={mapa} text={mapa.observacao} />

						<TableCell className="text-right">{mapa.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
