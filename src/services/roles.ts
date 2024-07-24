import type Roles from "@/types/Roles";
import type { PostAddRoleToUser, PostRole } from "@/types/Roles";
import { createBasicAuthHeader } from "./identity";

const baseUrl = "http://localhost:5000/api/roles";

export async function getRoles(): Promise<Roles[]> {
	try {
		const headers = await createBasicAuthHeader();
		const response = await fetch(baseUrl, { headers });
		console.log(response);
		if (!response.ok) {
			throw new Error(`erro status: ${response.status}`);
		}
		const roles = (await response.json()) as Roles[];
		return roles;
	} catch (e) {
		console.log(e);
		throw new Error(`Erro ao pegar os cargos, erro: ${e}`);
	}
}

export async function saveRole(role: PostRole) {
	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	console.log();
	const body = JSON.stringify(role);
	const response = await fetch(baseUrl, {
		method: "POST",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(`Erro ao adicionar os cargos, Status: ${response.status}`);
	}
}
export async function addRoleToUser(role: PostAddRoleToUser) {
	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	console.log();
	const body = JSON.stringify(role);
	const response = await fetch(`${baseUrl}/adicionar`, {
		method: "POST",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao adicionar o cargo ao usuário, Status: ${response.status}`,
		);
	}
}
export async function deleteRole(id: string) {
	const headers = await createBasicAuthHeader();
	const base = `${baseUrl}/${id}`;
	const response = await fetch(base, { method: "DELETE", headers });
	if (!response.ok) {
		alert(response.status);
		throw new Error(`Erro ao deletar o cargo, Status: ${response.status}`);
	}
}
export async function removeRoleFromUser(role: PostAddRoleToUser) {
	const headers = await createBasicAuthHeader();
	headers.append("Content-Type", "application/json");
	console.log();
	const body = JSON.stringify(role);
	const response = await fetch(`${baseUrl}/adicionar`, {
		method: "POST",
		headers,
		body: body,
	});
	if (!response.ok) {
		throw new Error(
			`Erro ao adicionar o cargo ao usuário, Status: ${response.status}`,
		);
	}
}
