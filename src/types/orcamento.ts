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
    massa:number
}

export interface PlanoOrcamento {
    quantidade: number;
    comprimento: number;
    largura: number;
    espessura: number;
    duracao: number;
    itens: ItemPlanoOrcamento[];
}
export const OrcamentoForm = z.object({file:z.instanceof(FileList)})