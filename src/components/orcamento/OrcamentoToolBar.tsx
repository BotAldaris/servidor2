import Combobox, { type escolhas } from "../ComboBox";
import { Input } from "../ui/input";

const tipo = [
  { label: "Beneficiamento", value: "0", valorReal: null },
  { label: "Venda", value: "1", valorReal: null },
] as escolhas[];

const impostos = [
  { label: "Laser Prime", value: "0.045", valorReal: null },
  { label: "Laser Blue", value: "0.078", valorReal: null },
];
interface IProps {
  espessuras: Map<string, escolhas[]>;
  materiais: escolhas[];
  ligas: Map<string, escolhas[]>;
  tipo: number;
  densidade: number;
  imposto: number;
  preco: number;
  precoLaser: number;
  porcentagemLucro: number;
  espessura: string;
  ligaId: string;
  materialId: string;
  setTipo: React.Dispatch<React.SetStateAction<number>>;
  setDensidade: React.Dispatch<React.SetStateAction<number>>;
  setImposto: React.Dispatch<React.SetStateAction<number>>;
  setPreco: React.Dispatch<React.SetStateAction<number>>;
  setPrecoLaser: React.Dispatch<React.SetStateAction<number>>;
  setPorcentagemLucro: React.Dispatch<React.SetStateAction<number>>;
  setEspessura: React.Dispatch<React.SetStateAction<string>>;
  setLigaId: React.Dispatch<React.SetStateAction<string>>;
  setMaterialId: React.Dispatch<React.SetStateAction<string>>;
}
export default function OrcamentoToolBar(props: IProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-around w-full">
        <Combobox
          escolhas={impostos}
          menssageInput="Escolha o Imposto..."
          menssageSearch="Procure por Imposto..."
          messageEmpty="Nenhum Imposto encontrado."
          menssageLabel="Imposto"
          value={props.imposto.toString()}
          setValue={converterStringParaNumber(props.setImposto)}
        />
        <Combobox
          escolhas={props.materiais}
          menssageInput="Escolha o Material..."
          menssageSearch="Procure pelo Material..."
          messageEmpty="Nenhum Material encontrado."
          menssageLabel="Material"
          value={props.materialId}
          setValue={props.setMaterialId}
        />
        <Combobox
          escolhas={props.ligas.get(props.materialId) ?? []}
          menssageInput="Escolha a Liga..."
          menssageSearch="Procure por Liga..."
          messageEmpty="Nenhum Liga encontrado."
          menssageLabel="Liga"
          value={props.ligaId}
          setValue={(x, y) => {
            props.setLigaId(x);
            props.setDensidade(Number.parseFloat(y === null ? "0" : y));
          }}
        />
        <Combobox
          escolhas={props.espessuras.get(props.ligaId) ?? []}
          menssageInput="Escolha a Espessura..."
          menssageSearch="Procure por Espessura..."
          messageEmpty="Nenhuma Espessura encontrada."
          menssageLabel="Espessura"
          value={props.espessura}
          setValue={(x, y) => {
            props.setEspessura(x);
            props.setPreco(Number.parseFloat(y === null ? "0" : y));
          }}
        />
        <Combobox
          escolhas={tipo}
          menssageInput="Escolha o Tipo..."
          menssageSearch="Procure por Tipo..."
          messageEmpty="Nenhum Tipo encontrado."
          menssageLabel="Tipo"
          value={props.tipo.toString()}
          setValue={converterStringParaNumber(props.setTipo)}
        />
      </div>
      <div>
        <div>
          <p>Preço Laser</p>
          <Input
            type="number"
            placeholder="Preço do Laser Materia Prima"
            onChange={(e) =>
              props.setPrecoLaser(Number.parseFloat(e.target.value))
            }
          />
        </div>
        {props.tipo === 1 && (
          <div className="flex gap-4">
            <div>
              <p>Porcentagem de Lucro</p>
              <Input
                type="number"
                value={props.porcentagemLucro}
                placeholder="Porcentagem de Lucro"
                onChange={(e) =>
                  props.setPorcentagemLucro(Number.parseFloat(e.target.value))
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function converterStringParaNumber(
  funcao: React.Dispatch<React.SetStateAction<number>>
) {
  function innerFunction(valor: string) {
    funcao(Number.parseFloat(valor));
  }
  return innerFunction;
}
