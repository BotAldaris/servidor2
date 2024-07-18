import type Op from "@/types/op";
import type { GetOPResult, PostOPRequest } from "@/types/op";

const baseUrl = "http://192.168.2.223:5000/api/ops";

export async function getOps(): Promise<Op[]> {
	try {
		const response = await fetch(baseUrl);
		console.log(response);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const opsoSemDataFormatada = (await response.json()) as GetOPResult[];
		return converterApiparaOp(opsoSemDataFormatada);
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os ops, erro: ${e}`);
	}
}

export async function getOpsById(id: string): Promise<Op> {
	try {
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const op = (await response.json()) as Op;
		return op;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar a OP, erro: ${e}`);
	}
}

export async function saveOpApi(op: PostOPRequest) {
	const body = JSON.stringify(op);
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao adicionar o op, Status: ${response.status}`);
	}
}

export async function putOpApi(op: PostOPRequest, id: string) {
	const base = `${baseUrl}/${id}`;
	const body = JSON.stringify(op);
	const response = await fetch(base, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao atualizar o op, Status: " + response.status`);
	}
}

export async function deleteOpApi(id: string) {
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE" });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o op, Status: ${response.status}`);
	}
}

function converterApiparaOp(opApi: GetOPResult[]): Op[] {
	const result = [] as Op[];
	for (const op of opApi) {
		const novoOp = {
			...op,
			dataLiberacao: new Date(op.dataLiberacao),
			dataEntrega: new Date(op.dataEntrega),
		} as Op;
		result.push(novoOp);
	}
	return result;
}
