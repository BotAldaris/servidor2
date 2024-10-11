import OrcamentoTable from "@/components/orcamento/OrcamentoTable";
import { Button } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { orcar } from "@/services/orcamento";
import { OrcamentoForm, type PlanoOrcamento } from "@/types/orcamento";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const Route = createFileRoute("/orcamento/")({
	component: () => <Orcamento />,
});

function Orcamento() {
	const [plano, setPlano] = useState<PlanoOrcamento>();
	return (
		<div className="flex  flex-col justify-center items-center w-full gap-2">
			<MapaForm setPlano={setPlano} />
			{plano && (
				<OrcamentoTable
					itens={plano.itens}
					espessura={plano.espessura}
					volume={
						(plano.espessura * plano.comprimento * plano.largura) / 1000000
					}
				/>
			)}
		</div>
	);
}

interface IMapaFormProps {
	setPlano: React.Dispatch<React.SetStateAction<PlanoOrcamento | undefined>>;
}
function MapaForm(props: IMapaFormProps) {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof OrcamentoForm>>({
		resolver: zodResolver(OrcamentoForm),
	});
	const fileRef = form.register("file");
	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof OrcamentoForm>) {
		try {
			const result = await orcar(values.file[0]);
			props.setPlano(result);
			console.log(result);
		} catch (e) {
			toast({
				variant: "destructive",
				title: "Erro ao salvar a op no Mapa",
				description: `Erro: ${e}`,
			});
			console.log(e);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Escolha o arquivo</FormLabel>
							<FormControl>
								<Input {...fileRef} type="file" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
