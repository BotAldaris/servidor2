import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Duration } from "date-fns";

interface IProps {
  duracao: Duration;
}

function duracaoParaEstilo(duracao: Duration) {
  let horas = 0;
  if (duracao.days != null) {
    horas += duracao.days * 24;
  }
  if (duracao.hours != null) {
    horas += duracao.hours;
  }
  if (duracao.minutes != null) {
    horas += duracao.minutes / 60;
  }
  if (duracao.seconds != null) {
    horas += duracao.seconds / 3600;
  }
  if (20 > horas) {
    return "";
  }
  return "animate-pulse animate-bounce bg-destructive";
}
function duracaoParaHoras(duracao: Duration) {
  let horas = 0;
  if (duracao.days != null) {
    horas += duracao.days * 24;
  }
  if (duracao.hours != null) {
    horas += duracao.hours;
  }
  return horas;
}
export default function TempoTotalCard(props: IProps) {
  return (
    <Card
      className={`max-w-xs ${duracaoParaEstilo(props.duracao)}`}
      x-chunk="charts-01-chunk-7"
    >
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>Tempo Total</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          {props.duracao.hours == null ? "00" : duracaoParaHoras(props.duracao)}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            hr
          </span>
          {props.duracao.hours == null ? "00" : props.duracao.minutes}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            min
          </span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
