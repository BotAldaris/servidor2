import type IMapaHora from "@/types/mapaHoras";
import { TableCell } from "../ui/table";

interface IProps {
	mapa: IMapaHora;
	text: string;
}

function obsToColor(obs: string) {
	if (obs === "URGENTE") {
		return "animate-pulse bg-urgente";
	}
	if (obs === "FMP") {
		return "bg-fmp";
	}
	return "";
}
export default function CelulaCliente(props: IProps) {
	return (
		<TableCell className={obsToColor(props.mapa.observacao)}>
			{props.text}
		</TableCell>
	);
}
