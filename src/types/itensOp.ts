import { z } from "zod";

const ItemOp = z.object({
	op: z.string().max(255),
	codigo: z.string().max(255),
	quantidade: z.coerce.number(),
	material: z.string().max(255),
	espessura: z.coerce.number(),
	valorLaser: z.coerce.number(),
	valorDobra: z.coerce.number(),
	valorCalderaria: z.coerce.number(),
	valorUsinagem: z.coerce.number(),
	valorMateriaPrima: z.coerce.number(),
	valorEntrega: z.coerce.number(),
	programado: z.boolean(),
});

export interface IItemOp {
	id: string;
	op: string;
	codigo: string;
	quantidade: number;
	material: string;
	espessura: number;
	valorLaser: number;
	valorDobra: number;
	valorCalderaria: number;
	valorUsinagem: number;
	valorMateriaPrima: number;
	valorEntrega: number;
	programado: boolean;
	quantidadeFabricada: number;
}
export default ItemOp;

export interface PostItemOPRequest {
	codigo: string;
	quantidade: number;
	material: string;
	espessura: number;
	valorLaser: number;
	valorDobra: number;
	valorCalderaria: number;
	valorUsinagem: number;
	valorMateriaPrima: number;
	valorEntrega: number;
	programado: boolean;
	op: string;
}

export interface ItemProgramacaoApi {
	id: string;
	codigo: string;
	op: string;
	quantidade: number;
	espessura: number;
	material: string;
	dobra: boolean;
	caldeiraria: boolean;
	tipo: string;
	cliente: string;
	dataEntrega: string;
}
export interface IItemProgramacao {
	id: string;
	codigo: string;
	op: string;
	quantidade: number;
	espessura: number;
	material: string;
	dobra: boolean;
	caldeiraria: boolean;
	tipo: string;
	cliente: string;
	dataEntrega: Date;
}

export enum Status {
	Programando = 0,
	SeparandoMaterial = 1,
	Cortando = 2,
	Dobrando = 3,
	Usinando = 4,
	Caldeiradando = 5,
	Faturando = 6,
	Concluido = 7,
}
