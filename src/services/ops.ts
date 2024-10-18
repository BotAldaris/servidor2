import type Op from "@/types/op";
import type {
  EditItemOPResult,
  GetOPResult,
  GetOpResumoResult,
  NumerosOps,
  OpResumo,
  PostOPRequest,
  PostPdf,
} from "@/types/op";
import { createBasicAuthHeader } from "./identity";
import type { IItemOp } from "@/types/itensOp";
import basebaseurl from "./basebaseurl";
import { fetch } from "@tauri-apps/plugin-http";

const baseUrl = `${basebaseurl}ops`;

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

export async function getResumoOps(): Promise<OpResumo[]> {
  try {
    const header = await createBasicAuthHeader();
    const response = await fetch(`${baseUrl}/resumo`, { headers: header });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const opsoSemDataFormatada = (await response.json()) as GetOpResumoResult[];
    return converterResumoApiparaResumoOp(opsoSemDataFormatada);
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar os ops, erro: ${e}`);
  }
}
export async function getPDF(postPDF: PostPdf): Promise<string[]> {
  try {
    const body = JSON.stringify(postPDF);
    const header = await createBasicAuthHeader();
    header.append("Content-Type", "application/json");
    const response = await fetch(`${baseUrl}/pdf`, {
      method: "POST",
      body,
      headers: header,
    });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const pdfs = (await response.json()) as string[];
    return pdfs;
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar os ops, erro: ${e}`);
  }
}
export async function getNumerosOps(): Promise<NumerosOps[]> {
  try {
    const header = await createBasicAuthHeader();
    const response = await fetch(`${baseUrl}/numeros`, { headers: header });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const ops = (await response.json()) as NumerosOps[];
    return ops;
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
  const body = JSON.stringify({
    ...op,
    dataLiberacao: op.dataLiberacao.toISOString().split("T")[0],
    dataEntrega: op.dataEntrega.toISOString().split("T")[0],
  });
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
  const body = JSON.stringify({
    ...op,
    dataLiberacao: op.dataLiberacao.toISOString().split("T")[0],
    dataEntrega: op.dataEntrega.toISOString().split("T")[0],
  });
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

export async function getItensOpsByIdFilterByRole(
  id: string
): Promise<EditItemOPResult> {
  try {
    const headers = await createBasicAuthHeader();
    const url = `${baseUrl}/${id}/itens?filtrarPorCargo=${true}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const op = (await response.json()) as EditItemOPResult;
    return op;
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar os itens, erro: ${e}`);
  }
}
export async function getItensOpsByOpId(id: string): Promise<IItemOp[]> {
  console.log(id);
  try {
    const headers = await createBasicAuthHeader();
    const url = `${baseUrl}/${id}/itens?filtrarPorCargo=${false}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`erro status: ${response.status}`);
    }
    const op = (await response.json()) as IItemOp[];
    console.log(op);
    return op;
  } catch (e) {
    console.log(e);
    throw new Error(`Erro ao pegar os itens, erro: ${e}`);
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
function converterResumoApiparaResumoOp(
  opApi: GetOpResumoResult[]
): OpResumo[] {
  const result = [] as OpResumo[];
  for (const op of opApi) {
    const novoOp = {
      ...op,
      dataEntrega: new Date(op.dataEntrega),
    } as OpResumo;
    result.push(novoOp);
  }
  return result;
}
