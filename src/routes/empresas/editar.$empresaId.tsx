import { MaterialForm } from "@/components/materiais/materiaisForm";
import { useToast } from "@/components/ui/use-toast";
import { getEmpresaById, putEmpresaApi } from "@/services/empresasService";
import type { ZMaterial } from "@/types/materiais";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { z } from "zod";

const editarEmpresaQuery = (num: string) =>
  queryOptions({
    queryKey: ["empresa", num],
    queryFn: () => getEmpresaById(num),
  });

export const Route = createFileRoute("/empresas/editar/$empresaId")({
  loader: ({ context: { queryClient }, params }) => {
    queryClient.ensureQueryData(editarEmpresaQuery(params.empresaId));
  },
  component: () => <EditMaterial />,
});

function EditMaterial() {
  const { empresaId } = Route.useParams();
  const postsQuery = useSuspenseQuery(editarEmpresaQuery(empresaId));
  const result = postsQuery.data;
  const navigate = useNavigate();
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof ZMaterial>) {
    try {
      await putEmpresaApi({ ...values }, empresaId);
      navigate({ to: "/materiais", replace: true });
    } catch (e) {
      const b = e as Error;
      toast({
        variant: "destructive",
        title: "Erro ao editar a empresa",
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
