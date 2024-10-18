import { createBasicAuthHeader } from "./identity";
import basebaseurl from "./basebaseurl";
import type Liga from "@/types/ligas";
import type { PostLigaRequest, SimpleLiga } from "@/types/ligas";
import type { escolhas } from "@/components/ComboBox";
import { fetch } from "@tauri-apps/plugin-http";

const baseUrl = `${basebaseurl}ligas`;
export async function getLigas(): Promise<Liga[]> {
  try {
    const headers = await createBasicAuthHeader();
    const response = await fetch(baseUrl, { headers });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const liga = (await response.json()) as Liga[];
    return liga;
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar as ligas, erro: ${e}`);
  }
}
export async function getLigaById(id: string): Promise<SimpleLiga> {
  try {
    const headers = await createBasicAuthHeader();
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const liga = (await response.json()) as SimpleLiga;
    return liga;
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar a liga, erro: ${e}`);
  }
}

export async function getLigaSeletor(): Promise<Map<string, escolhas[]>> {
  try {
    const headers = await createBasicAuthHeader();
    const url = `${baseUrl}/seletor/material`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const liga = new Map(Object.entries(await response.json())) as Map<
      string,
      escolhas[]
    >;
    console.log(liga);
    return liga;
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar a liga, erro: ${e}`);
  }
}
export async function saveLigaApi(item: PostLigaRequest) {
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
    throw new Error(`Erro ao adicionar a liga, Status: ${response.status}`);
  }
}

export async function putLigaApi(item: PostLigaRequest, id: string) {
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
    throw new Error(`Erro ao atualizar a liga, Status: " + response.status`);
  }
}
export async function deleteLigaApi(id: string) {
  const headers = await createBasicAuthHeader();
  const base = `${baseUrl}/${id}`;
  const response = await fetch(base, { method: "DELETE", headers });
  if (!response.ok) {
    alert(response.status);
    throw new Error(`Erro ao deletar a liga, Status: ${response.status}`);
  }
}
