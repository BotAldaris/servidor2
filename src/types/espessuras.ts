export interface Espessura {
	id: string;
	numero: number;
	preco: number;
	ligaId: string;
}
export interface PostEspessuraRequest {
	numero: number;
	preco: number;
	ligaId: string;
}
