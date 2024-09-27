import { z } from "zod";

export interface Material {
	id: string;
	nome: string;
}
export interface PostMaterialRequest {
	nome: string;
}
export const ZMaterial = z.object({
	nome: z.string().max(255),
});
