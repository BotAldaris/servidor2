import type { IItemOp, PostItemOPRequest } from "@/types/itensOp";

const baseUrl = "http://192.168.2.223:5000/api/itensOp/";

export async function getItensOp(): Promise<IItemOp[]> {
	try {
		const response = await fetch(baseUrl);
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
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url);
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
	const body = JSON.stringify(item);
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao adicionar o item, Status: ${response.status}`);
	}
}

export async function putItemOpApi(item: PostItemOPRequest, id: string) {
	const base = `${baseUrl}/${id}`;
	const body = JSON.stringify(item);
	const response = await fetch(base, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao atualizar o item, Status: " + response.status`);
	}
}

export async function deleteItemOpApi(id: string) {
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE" });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o item, Status: ${response.status}`);
	}
}
