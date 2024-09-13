import { useState } from "react";
import OrcamentoToolBar from "./OrcamentoToolBar";
import OrcamentoTableTable from "./OrcamentoTableTable";
import type { ItemPlanoOrcamento } from "@/types/orcamento";

interface IProps {
	itens: ItemPlanoOrcamento[];
	espessura: number;
	volume: number;
}

export default function OrcamentoTable(propis: IProps) {
	const [tipo, setTipo] = useState(1);
	const [material, setMaterial] = useState(7.87);
	const [imposto, setImposto] = useState(0.1145);
	const [preco, setPreco] = useState(0);
	const [precoLaser, setPrecoLaser] = useState(0);
	const [porcentagemLucro, setPorcentagemLucro] = useState(0);
	const custo = propis.volume * preco * 1.05 * material;
	const valorDeVenda = custo * (imposto - porcentagemLucro / 100);
	const props = {
		tipo,
		material,
		imposto,
		preco,
		precoLaser,
		porcentagemLucro,
		setTipo,
		setMaterial,
		setImposto,
		setPreco,
		setPrecoLaser,
		setPorcentagemLucro,
	};
	return (
		<div className="w-2/3">
			<OrcamentoToolBar {...props} />
			<OrcamentoTableTable
				venda={tipo === 1}
				itens={propis.itens}
				espessura={propis.espessura}
				valorLaser={precoLaser}
				valorMaterial={preco * 1.05 * (1 + porcentagemLucro / 100)}
				densidade={material}
			/>
		</div>
	);
}
