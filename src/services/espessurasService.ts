import { createBasicAuthHeader } from "./identity";
import basebaseurl from "./basebaseurl";
import type {
	Espessura,
	PostEspessuraRequest,
	SimpleEspessura,
} from "@/types/espessuras";

const baseUrl = `${basebaseurl}espessuras`;
export async function getEspessuras(): Promise<Espessura[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const espessura = (await response.json()) as Espessura[];
		return espessura;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar as espessuras, erro: ${e}`);
	}
}
export async function getEspessuraById(id: string): Promise<SimpleEspessura> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const espessura = (await response.json()) as SimpleEspessura;
		return espessura;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar a espessura, erro: ${e}`);
	}
}

export async function saveEspessuraApi(item: PostEspessuraRequest) {
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
		throw new Error(
			`Erro ao adicionar a espessura, Status: ${response.status}`,
		);
	}
}

export async function putEspessuraApi(item: PostEspessuraRequest, id: number) {
	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	const base = `${baseUrl}/${id}`;
	const body = JSON.stringify(item);
	const response = await fetch(base, {
		method: "PUT",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao atualizar a espessura, Status: " + response.status`,
		);
	}
}
export async function deleteEspessuraApi(id: string) {
	const headers = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar a espessura, Status: ${response.status}`);
	}
}
