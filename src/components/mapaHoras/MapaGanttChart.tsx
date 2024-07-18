import type IMapaHora from "@/types/mapaHoras";
import { Chart } from "react-google-charts";

const columns = [
	{ type: "string", label: "OP ID" },
	{ type: "string", label: "Numero OP" },
	{ type: "string", label: "Recursos" },
	{ type: "date", label: "Data Inicial" },
	{ type: "date", label: "Data Final" },
	{ type: "number", label: "Duração" },
	{ type: "number", label: "Porcentagem Completa" },
	{ type: "string", label: "Dependencias" },
];

function mapaHorasParaDadosGantt(mapaHoras: IMapaHora[]) {
	console.log(mapaHoras);
	const dados = [];
	for (let index = 0; index < mapaHoras.length; index++) {
		const mapa = mapaHoras[index];
		let recursos = "laser";
		if (mapa.dobra) {
			recursos += ", dobra";
		}
		if (mapa.calderaria) {
			recursos += ", calderaria";
		}
		recursos += ".";
		if (index === 0) {
			dados.push([
				mapa.id,
				mapa.numeroOp,
				recursos,
				null,
				null,
				(mapa.valorCorte / 500) * 60 * 60 * 1000,
				0,
				null,
			]);
		} else {
			dados.push([
				mapa.id,
				mapa.numeroOp,
				recursos,
				null,
				null,
				(mapa.valorCorte / 500) * 60 * 60 * 1000,
				0,
				mapaHoras[index - 1].id,
			]);
		}
	}
	console.log(dados);
	return dados;
}

interface IProps {
	mapaHoras: IMapaHora[];
}
export const options = {
	height: 400,
	gantt: {
		trackHeight: 30,
	},
};
export default function MapaGanttChart(props: IProps) {
	const dados = [columns, ...mapaHorasParaDadosGantt(props.mapaHoras)];
	console.log(dados);
	if (dados.length === 1) {
		return <div />;
	}
	return (
		<Chart
			chartType="Gantt"
			width="100%"
			height="70%"
			data={dados}
			options={options}
		/>
	);
}
