import type { IItemOp, PostItemOPRequest } from "@/types/itensOp";
import { createBasicAuthHeader } from "./identity";

const baseUrl = "http://192.168.2.223:5000/api/itensOp/";
// const baseUrl = "http://localhost:5000/api/itensOp";

export async function getItensOp(): Promise<IItemOp[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
		console.log(response);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const itensOp = (await response.json()) as IItemOp[];
		return itensOp;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os ops, erro: ${e}`);
	}
}

export async function getItensOpsById(id: string): Promise<IItemOp> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const op = (await response.json()) as IItemOp;
		return op;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o item, erro: ${e}`);
	}
}

export async function saveItemOpApi(item: PostItemOPRequest) {
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
		throw new Error(`Erro ao adicionar o item, Status: ${response.status}`);
	}
}

export async function putItemOpApi(item: PostItemOPRequest, id: string) {
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
		throw new Error(`Erro ao atualizar o item, Status: " + response.status`);
	}
}

export async function deleteItemOpApi(id: string) {
	const headers = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o item, Status: ${response.status}`);
	}
}
