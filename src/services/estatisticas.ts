import type { GanhoOpResult, IGanhoOp } from "@/types/estatisticas";
import { createBasicAuthHeader } from "./identity";

const baseUrl = "http://192.168.2.223:5000/api/estatisticas/ganhosop";
// const baseUrl = "http://localhost:5000/api/estatisticas/ganhosop";

export async function getGanhosOp(): Promise<IGanhoOp[]> {
	try {
		const header = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers: header });
		console.log(response);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapaSemDataFormatada = (await response.json()) as GanhoOpResult[];
		return converterApiparaOp(mapaSemDataFormatada);
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os ganhos, erro: ${e}`);
	}
}

export async function getGanhoOpById(id: string): Promise<IGanhoOp> {
	try {
		const header = await createBasicAuthHeader();
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url, { headers: header });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapa = (await response.json()) as IGanhoOp;
		return mapa;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o ganho, erro: ${e}`);
	}
}
export async function getGanhosOpByData(data: Date): Promise<IGanhoOp[]> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}?data=${data}`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapaSemDataFormatada = (await response.json()) as GanhoOpResult[];
		return converterApiparaOp(mapaSemDataFormatada);
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os ganhos, erro: ${e}`);
	}
}
export async function getGanhosOpGroupByData(data: Date): Promise<IGanhoOp[]> {
	try {
		const headers = await createBasicAuthHeader();
		const url = `${baseUrl}?data=${data}&groupby=true`;
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapaSemDataFormatada = (await response.json()) as GanhoOpResult[];
		return converterApiparaOp(mapaSemDataFormatada);
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os ganhos, erro: ${e}`);
	}
}
export async function faturarOp(dados: Map<string, number>) {
	const body = JSON.stringify(Object.fromEntries(dados));
	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	const response = await fetch(`${baseUrl}/faturar`, {
		method: "POST",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao adicionar a OP no mapa, Status: ${response.status}`,
		);
	}
}

function converterApiparaOp(dados: GanhoOpResult[]): IGanhoOp[] {
	const result = [] as IGanhoOp[];
	for (const item of dados) {
		const novoOp = {
			...item,
			data: new Date(item.data),
		} as IGanhoOp;
		result.push(novoOp);
	}
	return result;
}
