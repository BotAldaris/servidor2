import type {
	IItemOp,
	IItemProgramacao,
	ItemProgramacaoApi,
	PostItemOPRequest,
	Status,
} from "@/types/itensOp";
import { createBasicAuthHeader } from "./identity";
import type { StatusItemOp } from "@/types/op";
import type { ITableFaceted } from "@/types/tableFaceted";

// const baseUrl = "http://192.168.2.223:5000/api/itensOp";
const baseUrl = "http://localhost:5000/api/itensOp";

export async function getItensOp(): Promise<IItemOp[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
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
export async function getItensProgramar(): Promise<IItemProgramacao[]> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}/programar`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const itensOpApi = (await response.json()) as ItemProgramacaoApi[];
		console.log(itensOpApi);
		return converterApiparaResult(itensOpApi);
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
export async function putStatusItensOpApi(itens: StatusItemOp[]) {
	const headers = await createBasicAuthHeader();
	console.log(itens);
	headers.append("Content-Type", "application/json");
	const responses = await Promise.all(
		itens.map(async (x) =>
			fetch(`${baseUrl}/${x.id}`, {
				method: "PUT",
				headers,
				body: JSON.stringify(x),
			}),
		),
	);
	for (const response of responses) {
		if (!response.ok) {
			const erro = await response.text();
			throw new Error(`Erro ao atualizar os itens: ${erro}`);
		}
	}
	console.log("oi");
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
export async function getUniquesEspessuras(
	status: Status | null,
): Promise<ITableFaceted<number>[]> {
	try {
		const headers = await createBasicAuthHeader();
		let url = `${baseUrl}/unique/espessuras`;
		if (status != null) {
			url += `?status=${status}`;
		}
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const espessurras = (await response.json()) as number[];
		const result = [] as ITableFaceted<number>[];
		for (const espessura of espessurras) {
			result.push({ label: espessura.toString(), value: espessura });
		}
		return result;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar as espessuras, erro: ${e}`);
	}
}
export async function getUniquesMateriais(
	status: Status | null,
): Promise<ITableFaceted<string>[]> {
	try {
		const headers = await createBasicAuthHeader();
		let url = `${baseUrl}/unique/materiais`;
		if (status != null) {
			url += `?status=${status}`;
		}
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const materiais = (await response.json()) as string[];
		const result = [] as ITableFaceted<string>[];
		for (const material of materiais) {
			result.push({ label: material, value: material });
		}
		return result;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os materiais, erro: ${e}`);
	}
}
export async function getUniquesClientes(
	status: Status | null,
): Promise<ITableFaceted<string>[]> {
	try {
		const headers = await createBasicAuthHeader();
		let url = `${baseUrl}/unique/clientes`;
		if (status != null) {
			url += `?status=${status}`;
		}
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const clientes = (await response.json()) as string[];
		const result = [] as ITableFaceted<string>[];
		for (const cliente of clientes) {
			result.push({ label: cliente, value: cliente });
		}
		return result;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os clientes, erro: ${e}`);
	}
}
export async function getUniquesOps(
	status: Status | null,
): Promise<ITableFaceted<string>[]> {
	try {
		const headers = await createBasicAuthHeader();
		let url = `${baseUrl}/unique/numeros_op`;
		if (status != null) {
			url += `?status=${status}`;
		}
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const clientes = (await response.json()) as string[];
		const result = [] as ITableFaceted<string>[];
		for (const cliente of clientes) {
			result.push({ label: cliente, value: cliente });
		}
		return result;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os clientes, erro: ${e}`);
	}
}
export async function programarApi(itens: string[]) {
	const headers = await createBasicAuthHeader();
	const url = `${baseUrl}/programar`;
	headers.append("Content-Type", "application/json");
	const ids = { ids: itens };
	const body = JSON.stringify(ids);
	const response = await fetch(url, {
		method: "POST",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao adicionar o item, Status: ${response.status}`);
	}
}

function converterApiparaResult(
	itensApi: ItemProgramacaoApi[],
): IItemProgramacao[] {
	const result = [] as IItemProgramacao[];
	for (const item of itensApi) {
		const novoOp = {
			...item,
			dataEntrega: new Date(item.dataEntrega),
		} as IItemProgramacao;
		result.push(novoOp);
	}
	return result;
}
