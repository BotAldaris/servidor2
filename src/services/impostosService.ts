import { createBasicAuthHeader } from "./identity";
import basebaseurl from "./basebaseurl";
import type { Imposto, PostImpostoRequest } from "@/types/impostos";

const baseUrl = `${basebaseurl}impostos`;
export async function getImpostos(): Promise<Imposto[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const imposto = (await response.json()) as Imposto[];
		return imposto;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os impostos, erro: ${e}`);
	}
}
export async function getImpostoById(id: string): Promise<Imposto> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const imposto = (await response.json()) as Imposto;
		return imposto;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o imposto, erro: ${e}`);
	}
}

export async function saveImpostoApi(item: PostImpostoRequest) {
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
		throw new Error(`Erro ao adicionar o imposto, Status: ${response.status}`);
	}
}

export async function putImpostoApi(item: PostImpostoRequest, id: number) {
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
		throw new Error(`Erro ao atualizar o imposto, Status: " + response.status`);
	}
}
export async function deleteImpostoApi(id: string) {
	const headers = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o imposto, Status: ${response.status}`);
	}
}
