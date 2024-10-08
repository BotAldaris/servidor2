import type { escolhas } from "@/components/ComboBox";
import { EspessuraForm } from "@/components/materiais/espessurassForm";
import { useToast } from "@/components/ui/use-toast";
import { saveEspessuraApi } from "@/services/espessurasService";
import { getLigaSeletor } from "@/services/ligasService";
import { getMaterialSeletor } from "@/services/materiais";
import type { ZEspessura } from "@/types/espessuras";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { z } from "zod";

async function pegarDados(): Promise<{
	materiais: escolhas[];
	ligas: Map<string, escolhas[]>;
}> {
	const [materiais, ligas] = await Promise.all([
		getMaterialSeletor(),
		getLigaSeletor(),
	]);
	const result = [];
	for (const material of materiais) {
		result.push({ label: material.label, value: material.label } as escolhas);
	}
	return { materiais: result, ligas };
}

const adicionarEspesssuraQuery = queryOptions({
	queryKey: ["espessurra", "adicionar"],
	queryFn: () => pegarDados(),
});

export const Route = createFileRoute("/materiais/ligas/espessuras/adicionar")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(adicionarEspesssuraQuery);
	},
	component: () => <AddEspessura />,
});

function AddEspessura() {
	const { data } = useSuspenseQuery(adicionarEspesssuraQuery);
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
				espessura={{ numero: 0, preco: 0, ligaId: "" }}
				ligas={data.ligas}
			/>
		</div>
	);
}
