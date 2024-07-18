import MapaGanttChart from "@/components/mapaHoras/MapaGanttChart";
import MapaTable from "@/components/mapaHoras/MapaTabela";
import MapaTopBar from "@/components/mapaHoras/MapaTopBar";
import { getMapaHorasByData } from "@/services/MapaHoras";
import type IMapaHora from "@/types/mapaHoras";
import {
	queryOptions,
	useQuery,
	type QueryClient,
} from "@tanstack/react-query";
import { addHours, type Duration, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

const mapaHorasListQuery = (data: Date) =>
	queryOptions({
		queryKey: ["mapaHoras", data.toISOString().split("T")[0]],
		queryFn: () => getMapaHorasByData(data),
	});

export const loader = (queryClient: QueryClient) => async () => {
	const data = new Date();
	data.setHours(0, 0, 0, 0);
	return await queryClient.ensureQueryData(mapaHorasListQuery(data));
};

export default function MapaHorasIndex() {
	const dataI = new Date();
	dataI.setHours(0, 0, 0, 0);
	const [date, setDate] = useState<Date | undefined>(dataI);
	const { data } = useQuery(mapaHorasListQuery(date == null ? dataI : date));
	const [duracao, setDuracao] = useState({ hours: 0, minutes: 0 } as Duration);
	// biome-ignore lint/correctness/useExhaustiveDependencies: se tiver com a DataI, o valor ira mudar toda hora
	useEffect(() => {
		let total = 0;
		if (data !== undefined) {
			for (const mapa of data) {
				total += mapa.valorCorte;
			}
			const duration = intervalToDuration({
				start: dataI,
				end: addHours(dataI, total / 500),
			});
			setDuracao(duration);
		}
	}, [data]);
	return (
		<div>
			<MapaTopBar date={date} setDate={setDate} duracao={duracao} />
			<MapaTable mapa={data === undefined ? ([] as IMapaHora[]) : data} />
			<MapaGanttChart
				mapaHoras={data === undefined ? ([] as IMapaHora[]) : data}
			/>
		</div>
	);
}
