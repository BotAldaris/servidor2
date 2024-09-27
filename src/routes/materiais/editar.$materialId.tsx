import { MaterialForm } from "@/components/materiais/materiaisForm";
import { useToast } from "@/components/ui/use-toast";
import { getMaterialById, putMaterialApi } from "@/services/materiais";
import type { ZMaterial } from "@/types/materiais";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { z } from "zod";

const editarMaterialQuery = (num: string) =>
	queryOptions({
		queryKey: ["material", num],
		queryFn: () => getMaterialById(num),
	});

export const Route = createFileRoute("/materiais/editar/$materialId")({
	loader: ({ context: { queryClient }, params }) => {
		queryClient.ensureQueryData(editarMaterialQuery(params.materialId));
	},
	component: () => <EditMaterial />,
});

function EditMaterial() {
	const { materialId } = Route.useParams();
	const postsQuery = useSuspenseQuery(editarMaterialQuery(materialId));
	const result = postsQuery.data;
	const navigate = useNavigate();
	const { toast } = useToast();
	async function onSubmit(values: z.infer<typeof ZMaterial>) {
		try {
			await putMaterialApi({ ...values }, materialId);
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
			<MaterialForm onSubmit={onSubmit} material={{ ...result }} />
		</div>
	);
}
