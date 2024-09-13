import type { PlanoOrcamento } from "@/types/orcamento";
import basebaseurl from "./basebaseurl";
import { createBasicAuthHeader } from "./identity";

const baseUrl = `${basebaseurl}orcamento`

export async function orcar(file): Promise<PlanoOrcamento> {
	const formData = new FormData
    formData.append("file",file)
	const headers = await createBasicAuthHeader();
	const response = await fetch(baseUrl, {
		method: "POST",
		headers,
	    body: formData,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao adicionar a OP no mapa, Status: ${await response.text()}`,
		);
	}
    return await response.json() as PlanoOrcamento
}