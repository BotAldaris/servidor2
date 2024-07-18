import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IProps {
	numero: string;
	role: string;
	dados: [];
}

export default function MapaOpDialog(props: IProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{props.numero}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar OP{props.numero}</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							defaultValue="Pedro Duarte"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input
							id="username"
							defaultValue="@peduarte"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Salvar Mudanças</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
