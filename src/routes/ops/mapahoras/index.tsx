import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/Loading";
import MapaGanttChart from "@/components/mapahoras/MapaGanttChart";
import MapaTable from "@/components/mapahoras/MapaTabela";
import MapaTopBar from "@/components/mapahoras/MapaTopBar";
import { getMapaHorasByData } from "@/services/MapaHoras";
import type IMapaHora from "@/types/mapaHoras";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorText from "@/components/errorText";

const mapaHorasListQuery = (data: Date) =>
	queryOptions({
		queryKey: ["mapaHoras", data.toISOString().split("T")[0]],
		queryFn: () => getMapaHorasByData(data),
	});

function MapaHorasIndex() {
	const dataI = new Date();
	dataI.setHours(0, 0, 0, 0);
	const [date, setDate] = useState<Date | undefined>(dataI);
	const { data, isLoading, isError, refetch } = useQuery(
		mapaHorasListQuery(date == null ? dataI : date),
	);
	return (
		<div>
			{isLoading ? (
				<Loading />
			) : isError ? (
				<ErrorText refetch={refetch} texto="os itens da op" />
			) : (
				<div>
					<MapaTopBar date={date} setDate={setDate} dados={data} />
					<MapaTable mapa={data === undefined ? ([] as IMapaHora[]) : data} />
					<MapaGanttChart
						mapaHoras={data === undefined ? ([] as IMapaHora[]) : data}
					/>{" "}
				</div>
			)}
		</div>
	);
}

export const Route = createFileRoute("/ops/mapahoras/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(mapaHorasListQuery(new Date()));
	},
	component: () => <MapaHorasIndex />,
});
