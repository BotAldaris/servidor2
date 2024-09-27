export interface Imposto {
	id: string;
	nome: string;
	desconto: number;
	empresaId: string;
	empresaNome: string;
}
export interface SimpleImposto {
	id: string;
	nome: string;
	desconto: number;
	empresaId: string;
}
export interface PostImpostoRequest {
	nome: string;
	desconto: number;
	empresaId: string;
}
