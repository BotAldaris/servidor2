import type { Logar, Tokens } from "@/types/Roles";
import { addSeconds } from "date-fns";
import basebaseurl from "./basebaseurl";
import { fetch } from "@tauri-apps/plugin-http";
import { createStore } from "@tauri-apps/plugin-store";

const baseUrl = `${basebaseurl}`;
const store = await createStore("settings.bin");

async function setTokens(dados: Tokens, data: Date) {
  // await logar_tokens();
  await store.set("acesss_token", dados.accessToken);
  await store.set("refresh_token", dados.refreshToken);
  await store.set("expire", addSeconds(data, dados.expiresIn).toISOString());
  await store.save();
}
export async function resetTokens() {
  await store.delete("acesss_token");
  await store.delete("refresh_token");
  await store.delete("expire");
  await store.save();
}

async function logar_tokens() {
  const acess = await store.get("acesss_token");
  const refresh = await store.get("refresh_token");
  const expire = await store.get("expire");
  console.log(`acess: ${acess}`);
  console.log(`refresh: ${refresh}`);
  console.log(`expire: ${expire}`);
}

const getToken = async () => {
  const accessToken = (await store.get("acesss_token")) as string;
  // await logar_tokens();
  if (accessToken == null) {
    return await refreshToken();
  }
  const data = (await store.get("expire")) as string;
  if (data == null) {
    return "";
  }
  if (new Date() > new Date(data)) {
    return await refreshToken();
  }
  return accessToken;
};

export const isAuth = async () => {
  try {
    const token = await getToken();
    if (token === "") {
      return false;
    }
    return true;
  } catch {
    return false;
  }
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
  const refreshToken = await store.get("refresh_token");
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
    console.log("oi2");
    throw `Erro ao atulizar o seu token de acesso, erro: ${text}`;
  }
  const dados = (await response.json()) as Tokens;
  console.log(dados);
  await setTokens(dados, data);
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
    console.log(text);
    throw `Erro ao logar: ${text}`;
  }
  const result = (await response.json()) as Tokens;
  console.log(result);
  await setTokens(result, data);
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
