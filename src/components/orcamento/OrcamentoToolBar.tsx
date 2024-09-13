import Combobox from "../ComboBox";
import { Input } from "../ui/input";

const material = [
	{ label: "Carbono", value: "7.87" },
	{ label: "Inox", value: "8" },
	{ label: "Alumínio", value: "2.7" },
];
const tipo = [
	{ label: "Beneficiamento", value: "0" },
	{ label: "Venda", value: "1" },
];
const impostos = [
	{ label: "Até 180.000", value: "0.045" },
	{ label: "Até 360.000", value: "0.078" },
	{ label: "Até 720.000", value: "0.1" },
	{ label: "Até 1.800.000", value: "0.112" },
	{ label: "Até 3.600.000", value: "0.147" },
	{ label: "Até 4.800.000", value: "0.3" },
];
interface IProps {
	tipo: number;
	material: number;
	imposto: number;
	preco: number;
	precoLaser: number;
	porcentagemLucro: number;
	setTipo: React.Dispatch<React.SetStateAction<number>>;
	setMaterial: React.Dispatch<React.SetStateAction<number>>;
	setImposto: React.Dispatch<React.SetStateAction<number>>;
	setPreco: React.Dispatch<React.SetStateAction<number>>;
	setPrecoLaser: React.Dispatch<React.SetStateAction<number>>;
	setPorcentagemLucro: React.Dispatch<React.SetStateAction<number>>;
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
					escolhas={material}
					menssageInput="Escolha o Material..."
					menssageSearch="Procure pelo Material..."
					messageEmpty="Nenhum Material encontrado."
					menssageLabel="Material"
					value={props.material.toString()}
					setValue={converterStringParaNumber(props.setMaterial)}
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
						placeholder="Preço da Materia Prima"
						onChange={(e) =>
							props.setPrecoLaser(Number.parseFloat(e.target.value))
						}
					/>
				</div>
				{props.tipo === 1 && (
					<div className="flex gap-4">
						<div>
							<p>Preço</p>
							<Input
								type="number"
								value={props.preco}
								placeholder="Preço da Materia Prima"
								onChange={(e) =>
									props.setPreco(Number.parseFloat(e.target.value))
								}
							/>
						</div>
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
	funcao: React.Dispatch<React.SetStateAction<number>>,
) {
	function innerFunction(valor: string) {
		funcao(Number.parseFloat(valor));
	}
	return innerFunction;
}
