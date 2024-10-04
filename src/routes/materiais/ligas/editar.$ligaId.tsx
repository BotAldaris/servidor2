import type { escolhas } from '@/components/ComboBox';
import { LigaForm } from '@/components/materiais/ligasForm';
import { useToast } from '@/components/ui/use-toast';
import { getLigaById, putLigaApi, saveLigaApi } from '@/services/ligasService';
import { getMaterialSeletor } from '@/services/materiais';
import type { SimpleLiga, ZLiga } from '@/types/ligas';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { z } from 'zod';

async function pegarDados(id:string): Promise<{
	dados: SimpleLiga;
	materiais: escolhas[];
}> {
	const [dados, materiais] = await Promise.all([
		getLigaById(id),
        getMaterialSeletor(),
	]);
	return { dados, materiais };
}

const editarLigaQuery = (num: string) =>
	queryOptions({
		queryKey: ["liga","editar", num],
		queryFn: () => pegarDados(num),
	});

export const Route = createFileRoute('/materiais/ligas/editar/$ligaId')({
    loader: ({ context: { queryClient }, params }) => {
		queryClient.ensureQueryData(editarLigaQuery(params.ligaId));
	},
  component: () => <EditLiga/>,
})
function EditLiga() {
    const { ligaId } = Route.useParams();
	const { data } = useSuspenseQuery(editarLigaQuery(ligaId));
	const navigate = useNavigate();
	const { toast } = useToast();
	async function onSubmit(values: z.infer<typeof ZLiga>) {
		try {
			await putLigaApi({ ...values },ligaId);
			navigate({ to: "/materiais/ligas", replace: true });
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
			<LigaForm onSubmit={onSubmit} materiais={data.materiais} liga={data.dados}/>
		</div>
	);
}
