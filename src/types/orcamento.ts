import { z } from "zod";

export interface ItemPlanoOrcamento {
  codigo: string;
  comprimento: number;
  largura: number;
  op: string;
  cliente: string;
  quantidade: number;
  tempo: number;
  superficie: number;
  comprimentoCorte: number;
  massa: number;
  imagem: string;
  dobra: number;
  calderaria: number;
  usinagem: number;
  pintura: number;
  insumo: number;
}

export interface PlanoOrcamento {
  quantidade: number;
  comprimento: number;
  largura: number;
  espessura: number;
  duracao: number;
  itens: ItemPlanoOrcamento[];
  materialId: string;
  ligaId: string;
  espessuraId: string;
}

export interface PlanoOrcamentoTable {
  planoOrcamento: PlanoOrcamento;
  material: string;
  preco: number;
  porcentagem: number;
}
export const OrcamentoForm = z.object({ file: z.instanceof(FileList) });
