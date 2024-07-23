import type Op from "@/types/op";
import type { GetOPResult, PostOPRequest } from "@/types/op";
import { createBasicAuthHeader } from "./identity";

// const baseUrl = "http://192.168.2.223:5000/api/ops";
const baseUrl = "http://localhost:5000/api/ops";

export async function getOps(): Promise<Op[]> {
	try {
		const header = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers: header });
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
		const header = await createBasicAuthHeader();
		const response = await fetch(url, { headers: header });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const op = (await response.json()) as Op;
		console.log(op);
		return op;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar a OP, erro: ${e}`);
	}
}

export async function saveOpApi(op: PostOPRequest) {
	const header = await createBasicAuthHeader();
	header.append("Content-Type", "application/json");
	const body = JSON.stringify(op);
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: header,
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao adicionar o op, Status: ${response.status}`);
	}
}

export async function putOpApi(op: PostOPRequest, id: string) {
	const header = await createBasicAuthHeader();
	header.append("Content-Type", "application/json");
	const base = `${baseUrl}/${id}`;
	const body = JSON.stringify(op);
	const response = await fetch(base, {
		method: "PUT",
		headers: header,
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao atualizar o op, Status: " + response.status`);
	}
}

export async function deleteOpApi(id: string) {
	const header = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers: header });
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
