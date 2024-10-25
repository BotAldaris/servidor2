import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface IProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  length: number;
  setPlano: () => void;
}

export function OrcamentoTopTopBar(props: IProps) {
  return (
    <>
      <div className="flex items-center justify-center  space-x-2 w-full">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            props.setIndex(0);
            props.setPlano();
          }}
          disabled={props.index === 0}
        >
          <span className="sr-only">Ir para a primera pagina</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            props.setIndex(props.index - 1);
            props.setPlano();
          }}
          disabled={props.index === 0}
        >
          <span className="sr-only">Ir para a pagina anterior</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Card className="w-[75px] text-center">
          <CardHeader>
            <CardTitle>{props.index + 1}</CardTitle>
          </CardHeader>
        </Card>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            props.setIndex(props.index + 1);
            props.setPlano();
          }}
          disabled={props.index + 1 === props.length}
        >
          <span className="sr-only">Ir para proxima pagina</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            props.setIndex(props.length - 1);
            props.setPlano();
          }}
          disabled={props.index + 1 === props.length}
        >
          <span className="sr-only">Ir para ultima pagina</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
