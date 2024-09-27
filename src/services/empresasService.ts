import { createBasicAuthHeader } from "./identity";
import basebaseurl from "./basebaseurl";
import type { Empresa, PostEmpresaRequest } from "@/types/empresas";

const baseUrl = `${basebaseurl}empresas`;
export async function getEmpresas(): Promise<Empresa[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const empresa = (await response.json()) as Empresa[];
		return empresa;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar as empresas, erro: ${e}`);
	}
}
export async function getEmpresaById(id: string): Promise<Empresa> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const empresa = (await response.json()) as Empresa;
		return empresa;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar a empresa, erro: ${e}`);
	}
}

export async function saveEmpresaApi(item: PostEmpresaRequest) {
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
		throw new Error(`Erro ao adicionar a empresa, Status: ${response.status}`);
	}
}

export async function putEmpresaApi(item: PostEmpresaRequest, id: number) {
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
		throw new Error(`Erro ao atualizar a empresa, Status: " + response.status`);
	}
}
export async function deleteEmpresaApi(id: string) {
	const headers = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar a empresa, Status: ${response.status}`);
	}
}
