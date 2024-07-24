import type { Logar, Tokens } from "@/types/Roles";
import { addSeconds } from "date-fns";

const baseUrl = "http://192.168.2.223:5000/api/";
export const isAuthenticated = () => !!localStorage.getItem("refresh_token");

function setTokens(dados: Tokens, data: Date) {
	localStorage.setItem("acesss_token", dados.accessToken);
	localStorage.setItem("refresh_token", dados.refreshToken);
	localStorage.setItem(
		"expire",
		addSeconds(data, dados.expiresIn).toISOString(),
	);
}

export function resetTokens() {
	localStorage.removeItem("acesss_token");
	localStorage.removeItem("refresh_token");
	localStorage.removeItem("expire");
}

const getToken = async () => {
	const accessToken = localStorage.getItem("acesss_token");
	if (accessToken == null) {
		return await refreshToken();
	}
	const data = localStorage.getItem("expire");
	if (data == null) {
		return "";
	}
	if (new Date() > new Date(data)) {
		return await refreshToken();
	}
	return accessToken;
};

export async function createBasicAuthHeader(): Promise<Headers> {
	const token = await getToken();
	if (token === "") {
		throw new Error("era para ter sido redirecionado");
	}
	const headers = new Headers();
	headers.append("Authorization", `Bearer ${token}`);
	return headers;
}

async function refreshToken() {
	const refreshToken = localStorage.getItem("refresh_token");
	if (refreshToken == null) {
		return "";
	}
	const body = JSON.stringify({ refreshToken });
	const data = new Date();
	const response = await fetch(`${baseUrl}refresh`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		const text = await response.text();
		throw `Erro ao atulizar o seu token de acesso, erro: ${text}`;
	}
	const dados = (await response.json()) as Tokens;
	setTokens(dados, data);
	return dados.accessToken;
}

export async function logar(dados: Logar) {
	const url = `${baseUrl}login?useCookies=false`;
	const body = JSON.stringify(dados);

	const data = new Date();
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	if (!response.ok) {
		const text = await response.text();
		throw `Erro ao logar: ${text}`;
	}
	const result = (await response.json()) as Tokens;
	setTokens(result, data);
}
export async function register(dados: Logar) {
	try {
		const url = `${baseUrl}register`;
		const body = JSON.stringify(dados);
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		});
		console.log(response.status);
		if (!response.ok) {
			const text = await response.text();
			throw `Erro ao registrar: ${text}`;
		}
		console.log("oi");
	} catch (e) {
		console.log(e);
	}
}
