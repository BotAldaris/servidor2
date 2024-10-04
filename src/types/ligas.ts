import { z } from "zod";

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
export const ZLiga = z.object({
	nome: z.string().max(255),
	densidade: z.coerce.number(),
	materialId: z.string(),
});
