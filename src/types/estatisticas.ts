export interface GanhoOpResult {
	id: string;
	data: string;
	cliente: string;
	valorCorte: number;
	valorDobra: number;
	valorCalderaria: number;
	valorUsinagem: number;
	valorEntrega: number;
	valorMateriaPrima: number;
}
export interface IGanhoOp {
	id: string;
	data: Date;
	cliente: string;
	valorCorte: number;
	valorDobra: number;
	valorCalderaria: number;
	valorUsinagem: number;
	valorEntrega: number;
	valorMateriaPrima: number;
}
