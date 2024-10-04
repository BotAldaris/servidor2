import type { Material, PostMaterialRequest } from "@/types/materiais";
import { createBasicAuthHeader } from "./identity";
import basebaseurl from "./basebaseurl";
import type { escolhas } from "@/components/ComboBox";

const baseUrl = `${basebaseurl}materiais`;
export async function getMateriais(): Promise<Material[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const itensOp = (await response.json()) as Material[];
		return itensOp;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os materiais, erro: ${e}`);
	}
}
export async function getMaterialById(id: string): Promise<Material> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const op = (await response.json()) as Material;
		return op;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o material, erro: ${e}`);
	}
}

export async function getMaterialSeletor() : Promise<escolhas[]>{
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/seletor`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const op = (await response.json()) as escolhas[];
		return op;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o material, erro: ${e}`);
	}
}


export async function saveMaterialApi(item: PostMaterialRequest) {
	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	console.log();
	const body = JSON.stringify(item);
	const response = await fetch(baseUrl, {
		method: "POST",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao adicionar o material, Status: ${response.status}`);
	}
}

export async function putMaterialApi(item: PostMaterialRequest, id: string) {
	console.log(id);

	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	const base = `${baseUrl}/${id}`;
	const body = JSON.stringify(item);
	console.log(base);
	const response = await fetch(base, {
		method: "PUT",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao atualizar o material, Status: " + ${await response.text()}`,
		);
	}
}
export async function deleteMaterialApi(id: string) {
	const headers = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o material, Status: ${response.status}`);
	}
}
