import type { escolhas } from '@/components/ComboBox';
import { LigaForm } from '@/components/materiais/ligasForm';
import { useToast } from '@/components/ui/use-toast';
import { saveEspessuraApi } from '@/services/espessurasService';
import { getLigaSeletor, saveLigaApi } from '@/services/ligasService';
import { getMaterialSeletor } from '@/services/materiais';
import { ZEspessura } from '@/types/espessuras';
import { ZLiga } from '@/types/ligas';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod';

async function pegarDados(): Promise<{
	materiais: escolhas[];
  ligas: Map<string,escolhas[]>
}> {
	const [materiais, ligas] = await Promise.all([
        getMaterialSeletor(),
        getLigaSeletor()
	]);
	return { materiais, ligas };
}

const adicionarEspesssuraQuery =
	queryOptions({
		queryKey: ["espessurra","adicionar"],
		queryFn: () => pegarDados(),
	});



export const Route = createFileRoute('/materiais/ligas/espessuras/adicionar')({
  component: () => <div>Hello /materiais/ligas/espessuras/adicionar!</div>,
})


function AddEspessura() {
	const { data } = useSuspenseQuery(adicionarEspesssuraQuery);
	const navigate = useNavigate();
	const { toast } = useToast();
	async function onSubmit(values: z.infer<typeof ZEspessura>) {
		try {
			await saveEspessuraApi({ ...values });
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
			<Espe onSubmit={onSubmit} materiais={data} liga={{nome:"",densidade:0,materialId:""}}/>
		</div>
	);
}
