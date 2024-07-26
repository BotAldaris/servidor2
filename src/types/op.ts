import type { IItemOp } from "./itensOp";
import type { tipoEnum } from "./tipoEnum";
type Op = {
	id: string;
	numero: string;
	cliente: string;
	dataLiberacao: Date;
	dataEntrega: Date;
	status: string;
	tipo: typeof tipoEnum;
	itens: IItemOp[];
};
export default Op;

export type PostOPRequest = {
	numero: string;
	cliente: string;
	dataLiberacao: Date;
	dataEntrega: Date;
	tipo: string;
	status: string;
};

export type GetOPResult = {
	id: string;
	numero: string;
	cliente: string;
	dataLiberacao: string;
	dataEntrega: string;
	status: string;
	tipo: typeof tipoEnum;
	itens: IItemOp[];
};

export interface StatusItemOp {
	id: string;
	codigo: string;
	quantidade: number;
	programado: boolean | null;
	cortado: boolean | null;
	dobrado: boolean | null;
	usinado: boolean | null;
	calderado: boolean | null;
}

export interface EditItemOPResult {
	show: string[];
	item: StatusItemOp[];
}
