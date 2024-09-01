import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/Loading";
import MapaGanttChart from "@/components/mapahoras/MapaGanttChart";
import MapaTopBar from "@/components/mapahoras/MapaTopBar";
import {
	getMapaHorasByData,
	putOpMapaApi,
	saveMapaHoraApi,
} from "@/services/MapaHoras";
import type IMapaHora from "@/types/mapaHoras";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ErrorText from "@/components/errorText";
import { useToast } from "@/components/ui/use-toast";
import type { MapaAdicionarFormValue } from "@/components/mapahoras/MapaAdicionaOpDialog";
import ResumoOpTable from "@/components/ops/ResumoOpTable";
import { mapaHoraColumns } from "@/components/mapahoras/columns";
import { addDays } from "date-fns";

const mapaHorasListQuery = (data: Date) =>
	queryOptions({
		queryKey: ["mapaHoras", data.toISOString().split("T")[0]],
		queryFn: () => getMapaHorasByData(data),
	});

function MapaHorasIndex() {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const dataI = new Date();
	dataI.setHours(0, 0, 0, 0);
	const [date, setDate] = useState<Date | undefined>(dataI);
	const { data, isLoading, isError, refetch } = useQuery(
		mapaHorasListQuery(date == null ? dataI : date),
	);
	function onSubmit(
		dados: MapaAdicionarFormValue,
		setClose: React.Dispatch<React.SetStateAction<boolean>>,
	) {
		try {
			saveMapaHoraApi({
				opId: dados.numero,
				observacao: dados.observacao,
				data: date ?? new Date(),
			});
			setClose(false);
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao salvar a op",
				description: `Erro: ${b.message}`,
			});
			console.log(e);
		}
	}
	function modificarData(id: string, quantidade: number) {
		try {
			const data = date ?? new Date();
			const novaData = addDays(data, quantidade);
			putOpMapaApi(
				{
					data: novaData,
					opId: null,
					observacao: null,
				},
				id,
			);
			queryClient.invalidateQueries({
				queryKey: ["mapaHoras", data.toISOString().split("T")[0]],
			});
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao salvar a op",
				description: `Erro: ${b.message}`,
			});
			console.log(e);
		}
	}
	return (
		<div>
			{isLoading ? (
				<Loading />
			) : isError ? (
				<ErrorText refetch={refetch} texto="os itens da op" />
			) : (
				<div>
					<MapaTopBar
						date={date}
						setDate={setDate}
						dados={data}
						callback={onSubmit}
					/>
					<ResumoOpTable
						data={data ?? []}
						columns={mapaHoraColumns(modificarData)}
						filter="numeroOp"
					/>
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
