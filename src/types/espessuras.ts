import { z } from "zod";

export interface SimpleEspessura {
	id: string;
	numero: number;
	preco: number;
	ligaId: string;
}
export interface Espessura {
	id: string;
	numero: number;
	preco: number;
	liga: string;
	material: string;
}
export interface PostEspessuraRequest {
	numero: number;
	preco: number;
	ligaId: string;
}

export const ZEspessura = z.object({
	numero: z.coerce.number(),
	preco: z.coerce.number(),
	ligaId: z.string(),
});
