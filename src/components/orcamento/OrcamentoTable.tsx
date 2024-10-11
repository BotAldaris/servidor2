import { useState } from "react";
import OrcamentoToolBar from "./OrcamentoToolBar";
import OrcamentoTableTable from "./OrcamentoTableTable";
import type { ItemPlanoOrcamento } from "@/types/orcamento";
import { AnnoyedIcon, FrownIcon, SmilePlus } from "lucide-react";
import OrcamentoTopBar from "./OrcamentoTopBar";

interface IProps {
  itens: ItemPlanoOrcamento[];
  espessura: number;
  volume: number;
}

export default function OrcamentoTable(propis: IProps) {
  const [tipo, setTipo] = useState(1);
  const [material, setMaterial] = useState(8);
  const [imposto, setImposto] = useState(0.1145);
  const [preco, setPreco] = useState(0);
  const [precoLaser, setPrecoLaser] = useState(0);
  const [porcentagemLucro, setPorcentagemLucro] = useState(0);
  const custoLaser =
    propis.itens.reduce((z, y) => z + y.tempo * y.quantidade, 0) / 3600;
  const vc = custoLaser * precoLaser;
  const custo = propis.volume * preco * 1.05 * material * tipo;
  const lucroMinimo = custo / 4;
  const valorDeVenda = custo * (1 + porcentagemLucro) + vc;
  const vdd = valorDeVenda * 0.8855 - custo - vc * 0.9307;
  const p =
    (custo + lucroMinimo + vc * 0.9307) / (0.8855 * custo) - vc / custo - 1;
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
      <OrcamentoTopBar
        valorTotal={valorDeVenda}
        valorMaterial={custo}
        valorServico={vc * 0.9307}
        lucro={vdd}
      />
      <h1>{p}</h1>
      <Icone valor={vdd} total={custo} />
      <OrcamentoToolBar {...props} />
      <OrcamentoTableTable
        venda={tipo === 1}
        itens={propis.itens}
        espessura={propis.espessura}
        valorLaser={precoLaser}
        valorMaterial={preco * 1.05 * (1 + porcentagemLucro)}
        densidade={material}
      />
    </div>
  );
}

interface IPropsIcone {
  valor: number;
  total: number;
}

function Icone(props: IPropsIcone) {
  const resultado = props.valor - props.total / 4;
  console.log("res: ", resultado);
  if (resultado == 0) {
    return <AnnoyedIcon />;
  } else if (resultado > 0) {
    return <SmilePlus />;
  }
  return <FrownIcon />;
}
