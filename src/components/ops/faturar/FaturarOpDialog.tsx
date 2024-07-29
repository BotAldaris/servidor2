// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { getItensOpsByIdFilterByRole, getNumerosOps } from "@/services/ops";
// import {
//   type QueryObserverResult,
//   queryOptions,
//   type RefetchOptions,
//   useQuery,
// } from "@tanstack/react-query";
// import Loading from "../../Loading";
// import { useState } from "react";
// import ResumoOpTable from "../ResumoOpTable";
// import type { EditItemOPResult, NumerosOps, StatusItemOp } from "@/types/op";
// import type { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "../../DataTableColumnHeader";
// import { Checkbox } from "../../ui/checkbox";
// import { putStatusItensOpApi } from "@/services/itensOp";

// interface IProps {
//   numero: string | null;
//   id: string | null;
//   setId: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const itensOpQuery = () =>
//   queryOptions({
//     queryKey: ["NumerosOps"],
//     queryFn: () => getNumerosOps(),
//   });
// export default function FaturarOpDialog(props: IProps) {
//   const [clickado, setClickado] = useState(false);
//   return (
//     <div>
//       <Dialog onOpenChange={() => setClickado(!clickado)}>
//         <DialogTrigger asChild>
//           <Button variant="outline">
//             {props.numero == null ? "Selecione uma Op" : props.numero}
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="w-xl">
//           <DialogHeader>
//             <DialogTitle>Selecione uma OP{props.numero}</DialogTitle>
//             <DialogDescription>
//               Ache a Op que você quer faturarr aqui. Clique em salvar quando
//               você achar.
//             </DialogDescription>
//           </DialogHeader>
//           {clickado && <FaturarOpDialogContent />}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// function FaturarOpDialogContent() {
//   const { data, isLoading, isError, refetch } = useQuery(itensOpQuery());
//   if (isLoading) {
//     return <Loading />;
//   }
//   if (isError) {
//     return <ErrorText refetch={refetch} />;
//   }
//   if (data === undefined) {
//     return <p>Ops</p>;
//   }
//   return <SAA data={data} />;
// }
// interface IErrorProps {
//   refetch: (
//     options?: RefetchOptions,
//   ) => Promise<QueryObserverResult<NumerosOps[], Error>>;
// }

// function ErrorText(props: IErrorProps) {
//   return (
//     <div>
//       <p>Ocorreu um erro ao pegar os itens da op, tente novamente.</p>
//       <Button onClick={() => props.refetch()}>Tentar Novamente</Button>
//     </div>
//   );
// }
// interface ISaaProps {
//   data: NumerosOps[];
// }
// function SAA(props: ISaaProps) {
//   const [data, setData] = useState(props.data);
//   const [selected, setSeleted] = useState<string | null>(null);
//   const handleCheckboxChange = (id: string, column: string) => {
//     console.log(data[0]);
//     setData((prevData) =>
//       prevData.map((item) => {
//         if (item.id === id) {
//           return { ...item, [column]: !item[column] };
//         }
//         return item;
//       }),
//     );
//   };
//   return (
//     <>
//       <MapaOpDialogTable
//         data={data}
//         columns={generateColumns(props.data.show, handleCheckboxChange)}
//       />
//       <DialogFooter>
//         <DialogTrigger asChild>
//           <Button type="submit" onClick={() => putStatusItensOpApi(data)}>
//             Salvar Mudanças
//           </Button>
//         </DialogTrigger>
//       </DialogFooter>
//     </>
//   );
// }

// function generateColumns(
//   colunas: string[] | undefined,
//   set: (id: string, column: string) => void,
// ) {
//   const columns: ColumnDef<StatusItemOp>[] = [
//     {
//       accessorKey: "codigo",
//       header: ({ column }) => {
//         return <DataTableColumnHeader title="Codigo" column={column} />;
//       },
//     },
//     {
//       accessorKey: "quantidade",
//       header: ({ column }) => {
//         return <DataTableColumnHeader title="Quantidade" column={column} />;
//       },
//     },
//   ];
//   if (colunas === undefined) {
//     return columns;
//   }
//   for (const coluna of colunas) {
//     const accessor = coluna[0].toLowerCase() + coluna.slice(1);
//     columns.push({
//       accessorKey: accessor,
//       header: ({ column }) => {
//         return <DataTableColumnHeader title={coluna} column={column} />;
//       },
//       cell: ({ cell, row, column }) =>
//         cell.getValue() === null ? (
//           <div />
//         ) : (
//           <Checkbox
//             checked={row.original[column.id]}
//             onCheckedChange={() => set(row.original.id, column.id)}
//             aria-label="Select row"
//           />
//         ),
//     });
//   }

//   return columns;
// }
