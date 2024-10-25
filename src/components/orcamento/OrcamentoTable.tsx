import { useEffect, useState } from "react";
import OrcamentoToolBar from "./OrcamentoToolBar";
import OrcamentoTableTable from "./OrcamentoTableTable";
import type {
  ItemPlanoOrcamento,
  PlanoOrcamentoTable,
} from "@/types/orcamento";
import { AnnoyedIcon, FrownIcon, SmilePlus } from "lucide-react";
import OrcamentoTopBar from "./OrcamentoTopBar";
import { OrcamentoTopTopBar } from "./OrcamentoTopTopBar";
import { Button } from "../ui/button";
import type { escolhas } from "../ComboBox";

interface IProps {
  itens: ItemPlanoOrcamento[];
  espessura: number;
  volume: number;
  plano: PlanoOrcamentoTable;
  setOrcamento: (item: PlanoOrcamentoTable) => void;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  length: number;
  espessuras: Map<string, escolhas[]>;
  materiais: escolhas[];
  ligas: Map<string, escolhas[]>;
}

export default function OrcamentoTable(propis: IProps) {
  const [tipo, setTipo] = useState(1);
  const [densidade, setDensidade] = useState(8);
  const [imposto, setImposto] = useState(0.1145);
  const [espessura, setEspessura] = useState(
    propis.plano.planoOrcamento.espessuraId
  );
  const [ligaId, setLigaId] = useState(propis.plano.planoOrcamento.ligaId);
  const [materialId, setMaterialId] = useState(
    propis.plano.planoOrcamento.materialId
  );
  const [preco, setPreco] = useState(propis.plano.preco);
  const [precoLaser, setPrecoLaser] = useState(0);
  const [porcentagemLucro, setPorcentagemLucro] = useState(
    propis.plano.porcentagem
  );
  const [dobras, setDobras] = useState([] as number[]);
  const [calderarias, setCalderarias] = useState([] as number[]);
  const [usinagens, setUsinagens] = useState([] as number[]);
  const [pinturas, setPinturas] = useState([] as number[]);
  const [insumos, setInsumos] = useState([] as number[]);

  useEffect(() => {
    setDobras(propis.itens.map((item) => item.dobra || 0));
    setCalderarias(propis.itens.map((item) => item.calderaria || 0));
    setUsinagens(propis.itens.map((item) => item.usinagem || 0));
    setPinturas(propis.itens.map((item) => item.pintura || 0));
    setInsumos(propis.itens.map((item) => item.insumo || 0));
    setEspessura(propis.plano.planoOrcamento.espessuraId);
    setLigaId(propis.plano.planoOrcamento.ligaId);
    setMaterialId(propis.plano.planoOrcamento.materialId);
    setPreco(propis.plano.preco);
    setPorcentagemLucro(propis.plano.porcentagem);
  }, [propis]);
  const custoLaser =
    propis.itens.reduce((z, y) => z + y.tempo * y.quantidade, 0) / 3600;
  const custoDobra = propis.itens
    .entries()
    .reduce((x, y) => x + dobras[y[0]] * y[1].quantidade, 0);
  const custoCalderaria = propis.itens
    .entries()
    .reduce((x, y) => x + calderarias[y[0]] * y[1].quantidade, 0);
  const custoUsinagem = propis.itens
    .entries()
    .reduce((x, y) => x + usinagens[y[0]] * y[1].quantidade, 0);
  const custoPintura = propis.itens
    .entries()
    .reduce((x, y) => x + pinturas[y[0]] * y[1].quantidade, 0);
  const custoInsumos = propis.itens
    .entries()
    .reduce((x, y) => x + insumos[y[0]] * y[1].quantidade, 0);
  const vc =
    custoLaser * precoLaser +
    custoDobra +
    custoCalderaria +
    custoUsinagem +
    custoPintura +
    custoInsumos;
  const custo = propis.volume * preco * 1.05 * densidade * tipo;
  const lucroMinimo = custo / 4;
  const valorDeVenda = custo * (1 + porcentagemLucro) + vc;
  const vdd = valorDeVenda * 0.8855 - custo - vc * 0.9307;
  const p =
    (custo + lucroMinimo + vc * 0.9307) / (0.8855 * custo) - vc / custo - 1;
  const props = {
    tipo,
    densidade,
    imposto,
    preco,
    precoLaser,
    porcentagemLucro,
    espessura,
    ligaId,
    materialId,
    setTipo,
    setDensidade,
    setImposto,
    setPreco,
    setPrecoLaser,
    setPorcentagemLucro,
    setEspessura,
    setLigaId,
    setMaterialId,
    espessuras: propis.espessuras,
    materiais: propis.materiais,
    ligas: propis.ligas,
  };
  function salvarPlano() {
    const novoPlano = propis.plano;
    novoPlano.porcentagem = porcentagemLucro;
    novoPlano.preco = preco;
    novoPlano.planoOrcamento.materialId = materialId;
    novoPlano.planoOrcamento.ligaId = ligaId;
    novoPlano.planoOrcamento.espessuraId = espessura;
    const itens = [];
    for (let i = 0; i < propis.itens.length; i++) {
      const item = propis.itens[i];
      item.calderaria = calderarias[i];
      item.dobra = dobras[i];
      item.usinagem = usinagens[i];
      item.pintura = pinturas[i];
      item.insumo = insumos[i];
      itens.push(item);
      novoPlano.planoOrcamento.itens = itens;
    }
    propis.setOrcamento(novoPlano);
  }
  return (
    <div className="w-4/5 flex flex-col gap-2">
      <OrcamentoTopTopBar
        index={propis.index}
        setIndex={propis.setIndex}
        length={propis.length}
        setPlano={salvarPlano}
      />
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
        densidade={densidade}
        dobras={dobras}
        setDobras={setDobras}
        calderarias={calderarias}
        setCalderarias={setCalderarias}
        usinagens={usinagens}
        setUsinagem={setUsinagens}
        pinturas={pinturas}
        setPinturas={setPinturas}
        insumos={insumos}
        setInsumos={setInsumos}
      />
      <Button onClick={salvarPlano}>Salvar</Button>
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
