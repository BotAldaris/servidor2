import { MaterialForm } from "@/components/materiais/materiaisForm";
import { useToast } from "@/components/ui/use-toast";
import { saveMaterialApi } from "@/services/materiais";
import type { ZMaterial } from "@/types/materiais";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { z } from "zod";

export const Route = createFileRoute("/materiais/adicionar")({
	component: () => AddMaterial(),
});

function AddMaterial() {
	const navigate = useNavigate();
	const { toast } = useToast();
	async function onSubmit(values: z.infer<typeof ZMaterial>) {
		try {
			await saveMaterialApi({ ...values });
			navigate({ to: "/materiais", replace: true });
		} catch (e) {
			const b = e as Error;
			toast({
				variant: "destructive",
				title: "Erro ao criar o material",
				description: `Erro: ${b.message}`,
			});
			console.log(e);
		}
	}
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<MaterialForm onSubmit={onSubmit} material={{ nome: "" }} />
		</div>
	);
}
