import { z } from "zod";

export interface Empresa {
	id: string;
	nome: string;
}
export interface PostEmpresaRequest {
	nome: string;
}

export const ZEmpresa = z.object({
	nome: z.string().max(255),
});
