import type IMapaHora from "@/types/mapaHoras";
import type { GetMapaHora, PostMapaHoraRequest } from "@/types/mapaHoras";

const baseUrl = "http://192.168.2.223:5000/api/mapaHoras";

export async function getMapaHoras(): Promise<IMapaHora[]> {
	try {
		const response = await fetch(baseUrl);
		console.log(response);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapaSemDataFormatada = (await response.json()) as GetMapaHora[];
		return converterApiparaOp(mapaSemDataFormatada);
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os mapas, erro: ${e}`);
	}
}

export async function getMapaHoraById(id: string): Promise<IMapaHora> {
	try {
		const url = `${baseUrl}/${id}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapa = (await response.json()) as IMapaHora;
		return mapa;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o mapa, erro: ${e}`);
	}
}
export async function getMapaHorasByData(data: Date): Promise<IMapaHora[]> {
	try {
		const url = `${baseUrl}?data=${data.toISOString()}`;
		console.log(url);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const mapaSemDataFormatada = (await response.json()) as GetMapaHora[];
		return converterApiparaOp(mapaSemDataFormatada);
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar o mapa, erro: ${e}`);
	}
}
export async function saveMapaHoraApi(mapa: PostMapaHoraRequest) {
	const body = JSON.stringify(mapa);
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao adicionar a OP no mapa, Status: ${response.status}`,
		);
	}
}

export async function putOpMapaApi(mapa: PostMapaHoraRequest, id: string) {
	const base = `${baseUrl}/${id}`;
	const body = JSON.stringify(mapa);
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

export async function deleteMapaApi(id: string) {
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE" });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o op, Status: ${response.status}`);
	}
}

function converterApiparaOp(mapaApi: GetMapaHora[]): IMapaHora[] {
	const result = [] as IMapaHora[];
	for (const mapa of mapaApi) {
		const novoOp = {
			...mapa,
			dataLiberacao: new Date(mapa.dataLiberacao),
			dataEntrega: new Date(mapa.dataEntrega),
		} as IMapaHora;
		result.push(novoOp);
	}
	return result;
}
