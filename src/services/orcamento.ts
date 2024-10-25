import type { PlanoOrcamento } from "@/types/orcamento";
import basebaseurl from "./basebaseurl";
import { createBasicAuthHeader } from "./identity";
import { fetch } from "@tauri-apps/plugin-http";

const baseUrl = `${basebaseurl}orcamento`;

export async function orcar(file): Promise<PlanoOrcamento> {
  console.time("orcamento");
  const formData = new FormData();
  formData.append("file", file);
  const headers = await createBasicAuthHeader();
  const response = await fetch(baseUrl, {
    method: "POST",
    headers,
    body: formData,
  });
  if (!response.ok) {
    throw new Error(
      `Erro ao adicionar a OP no mapa, Status: ${await response.text()}`
    );
  }
  const result = (await response.json()) as PlanoOrcamento;
  const itens = [];
  for (const item of result.itens) {
    item.calderaria = 0;
    item.usinagem = 0;
    item.pintura = 0;
    item.dobra = 0;
    item.insumo = 0;
    itens.push(item);
  }
  result.itens = itens;
  result.espessuraId = "";
  result.materialId = "";
  result.ligaId = "";
  console.timeEnd("orcamento");
  return result;
}
