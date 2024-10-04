import { LigaForm } from '@/components/materiais/ligasForm';
import { useToast } from '@/components/ui/use-toast';
import { saveLigaApi } from '@/services/ligasService';
import { getMaterialSeletor } from '@/services/materiais';
import type { ZLiga } from '@/types/ligas';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { z } from 'zod';

const ligaListQuery = () =>
	queryOptions({ queryKey: ["materiais","seletor"], queryFn: () => getMaterialSeletor() });


export const Route = createFileRoute('/materiais/ligas/adicionar')({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(ligaListQuery());
	},
  	component: () => <AddLiga/>,
})

function AddLiga() {
	const { data } = useSuspenseQuery(ligaListQuery());
	const navigate = useNavigate();
	const { toast } = useToast();
	async function onSubmit(values: z.infer<typeof ZLiga>) {
		try {
			await saveLigaApi({ ...values });
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
			<LigaForm onSubmit={onSubmit} materiais={data} liga={{nome:"",densidade:0,materialId:""}}/>
		</div>
	);
}
