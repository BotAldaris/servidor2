import type { escolhas } from "@/components/ComboBox";
import { EspessuraForm } from "@/components/materiais/espessurassForm";
import { useToast } from "@/components/ui/use-toast";
import {
	getEspessuraById,
	saveEspessuraApi,
} from "@/services/espessurasService";
import { getLigaSeletor } from "@/services/ligasService";
import { getMaterialSeletor } from "@/services/materiais";
import type { SimpleEspessura, ZEspessura } from "@/types/espessuras";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { z } from "zod";

async function pegarDados(espessuraId: string): Promise<{
	materiais: escolhas[];
	ligas: Map<string, escolhas[]>;
	espessura: SimpleEspessura;
}> {
	const [materiais, ligas, espessura] = await Promise.all([
		getMaterialSeletor(),
		getLigaSeletor(),
		getEspessuraById(espessuraId),
	]);
	const result = [];
	for (const material of materiais) {
		result.push({ label: material.label, value: material.label } as escolhas);
	}
	return { materiais: result, ligas, espessura };
}

const editarEspesssuraQuery = (espessuraId: string) =>
	queryOptions({
		queryKey: ["espessurra", "editar", espessuraId],
		queryFn: () => pegarDados(espessuraId),
	});

export const Route = createFileRoute(
	"/materiais/ligas/espessuras/editar/$espessuraId",
)({
	loader: ({ context: { queryClient }, params }) => {
		queryClient.ensureQueryData(editarEspesssuraQuery(params.espessuraId));
	},
	component: () => <EditEspessura />,
});

function EditEspessura() {
	const { espessuraId } = Route.useParams();
	const { data } = useSuspenseQuery(editarEspesssuraQuery(espessuraId));
	const navigate = useNavigate();
	const { toast } = useToast();
	async function onSubmit(values: z.infer<typeof ZEspessura>) {
		try {
			await saveEspessuraApi({ ...values });
			navigate({ to: "/materiais/ligas/espessuras", replace: true });
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao criar a liga",
				description: `Erro: ${b.message}`,
			});
			console.log(e);
		}
	}
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<EspessuraForm
				onSubmit={onSubmit}
				materiais={data.materiais}
				espessura={data.espessura}
				ligas={data.ligas}
			/>
		</div>
	);
}
