export default interface Liga {
	id: string;
	nome: string;
	densidade: number;
	materialId: string;
	material: string;
}
export interface SimpleLiga {
	id: string;
	nome: string;
	densidade: number;
	materialId: string;
}
export interface PostLigaRequest {
	nome: string;
	densidade: number;
	materialId: string;
}
