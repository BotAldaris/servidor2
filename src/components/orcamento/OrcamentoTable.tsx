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
  const [dobras, setDobras] = useState(
    propis.itens.map((item) => item.dobra) // Inicializa com os valores atuais da dobra
  );
  const [calderarias, setCalderarias] = useState(
    propis.itens.map((item) => item.calderaria) // Inicializa com os valores atuais da dobra
  );
  const [usinagens, setUsinagens] = useState(
    propis.itens.map((item) => item.dobra) // Inicializa com os valores atuais da dobra
  );
  const [pinturas, setPinturas] = useState(
    propis.itens.map((item) => item.dobra) // Inicializa com os valores atuais da dobra
  );
  const [dobras, setDobras] = useState(
    propis.itens.map((item) => item.dobra) // Inicializa com os valores atuais da dobra
  );
  const custoLaser =
    propis.itens.reduce((z, y) => z + y.tempo * y.quantidade, 0) / 3600;
  const custoDobra = propis.itens
    .entries()
    .reduce((x, y) => x + dobras[y[0]] * y[1].quantidade, 0);
  const vc = custoLaser * precoLaser + custoDobra;
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
        valorLaser={precoLaser}
        valorMaterial={preco * 1.05 * (1 + porcentagemLucro)}
        densidade={material}
        dobras={dobras}
        setDobras={setDobras}
        calderarias={calderarias}
        setCalderarias={setCalderarias}
        usinagens={usinagens}
        setUsinagem={setUsinagens}
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
  if (resultado === 0) {
    return <AnnoyedIcon />;
  }
  if (resultado > 0) {
    return <SmilePlus />;
  }
  return <FrownIcon />;
}
