import { z } from "zod";

interface IMapaHora {
	id: string;
	opId: string;
	numeroOp: string;
	cliente: string;
	dataLiberacao: Date;
	dataEntrega: Date;
	tipo: string;
	valorCorte: number;
	dobra: boolean;
	calderaria: boolean;
	observacao: string;
	status: number[];
}
export interface IMapaHoraSimple {
	id: string;
	opId: string;
	data: Date;
	observacao: string;
}

export default IMapaHora;

export interface PostMapaHoraRequest {
	data: Date;
	opId: string;
	observacao: string | null;
}
export interface PutMapaHoraRequest {
	data: Date | null;
	opId: string | null;
	observacao: string | null;
}
export const MapaHora = z.object({
	opId: z.string().max(255),
	observacao: z.string().max(255).nullable(),
	data: z.coerce.date(),
});

export interface GetMapaHora {
	id: string;
	opId: string;
	numeroOp: string;
	cliente: string;
	dataLiberacao: string;
	dataEntrega: string;
	tipo: string;
	valorCorte: number;
	dobra: boolean;
	calderaria: boolean;
	observacao: string;
	status: number[];
}
export interface GetMapaHoraSimple {
	id: string;
	opId: string;
	data: string;
	observacao: string;
}
