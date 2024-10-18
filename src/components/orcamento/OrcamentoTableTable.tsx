import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ItemPlanoOrcamento } from "@/types/orcamento";
import { formatDuration, intervalToDuration } from "date-fns";
import { Input } from "../ui/input";
interface IProps {
  venda: boolean;
  itens: ItemPlanoOrcamento[];
  valorLaser: number;
  valorMaterial: number;
  densidade: number;
  dobras: number[];
  setDobras: React.Dispatch<React.SetStateAction<number[]>>;
  calderarias: number[];
  setCalderarias: React.Dispatch<React.SetStateAction<number[]>>;
  usinagens: number[];
  setUsinagem: React.Dispatch<React.SetStateAction<number[]>>;
  pinturas: number[];
  setPinturas: React.Dispatch<React.SetStateAction<number[]>>;
  Insumos: number[];
  setInsumos: React.Dispatch<React.SetStateAction<number[]>>;
}
export default function OrcamentoTableTable(props: IProps) {
  console.log(props.valorLaser);
  const handleChange = (
    index: number,
    value: number,
    setNumberList: React.Dispatch<React.SetStateAction<number[]>>,
    changeNumberList: number[]
  ) => {
    const newDobras = [...changeNumberList];
    newDobras[index] = value;
    setNumberList(newDobras);
  };
  return (
    <Table>
      <TableCaption>Todos os itens do Orçamento.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Imagem</TableHead>
          <TableHead className="w-[100px]">Codigo</TableHead>
          <TableHead>Tempo</TableHead>
          <TableHead>Preço Laser</TableHead>
          {props.venda && <TableHead>Preço Material</TableHead>}
          <TableHead>Dobra</TableHead>
          <TableHead>Calderaria</TableHead>
          <TableHead>Usinagem</TableHead>
          <TableHead>Pintura</TableHead>
          <TableHead>Insumos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.itens.map((item, index) => (
          <TableRow key={item.codigo}>
            <TableCell>
              <img src={item.imagem} alt={`imagem do ${item.codigo}`} />
            </TableCell>
            <TableCell className="font-medium">{item.codigo}</TableCell>
            <TableCell>
              {formatDuration(
                intervalToDuration({ start: 0, end: item.tempo * 1000 }),
                { format: ["minutes", "seconds"] }
              )}
            </TableCell>
            <TableCell>
              {((item.tempo * props.valorLaser) / 3600).toFixed(2)}
            </TableCell>
            {props.venda && (
              <TableCell>
                {(item.massa * props.densidade * props.valorMaterial).toFixed(
                  2
                )}
              </TableCell>
            )}
            <TableCell>
              <Input
                type="number"
                value={props.dobras[index]}
                onChange={(e) =>
                  handleChange(
                    index,
                    Number(e.target.value),
                    props.setDobras,
                    props.dobras
                  )
                }
                className="border"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={props.calderarias[index]}
                onChange={(e) =>
                  handleChange(
                    index,
                    Number(e.target.value),
                    props.setCalderarias,
                    props.calderarias
                  )
                }
                className="border"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={props.usinagens[index]}
                onChange={(e) =>
                  handleChange(
                    index,
                    Number(e.target.value),
                    props.setUsinagem,
                    props.usinagens
                  )
                }
                className="border"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={props.pinturas[index]}
                onChange={(e) =>
                  handleChange(
                    index,
                    Number(e.target.value),
                    props.setPinturas,
                    props.pinturas
                  )
                }
                className="border"
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={props.pinturas[index]}
                onChange={(e) =>
                  handleChange(
                    index,
                    Number(e.target.value),
                    props.setInsumos,
                    props.Insumos
                  )
                }
                className="border"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
