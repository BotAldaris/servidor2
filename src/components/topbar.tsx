"use client";

import * as React from "react";

import { cn } from "../lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const ops: { title: string; href: string; description: string }[] = [
	{
		title: "Mapa Horas",
		href: "/ops/mapahoras",
		description: "Mapa de horas desse mês.",
	},
	{
		title: "Adicionar",
		href: "/ops/adicionar",
		description: "Adicione uma OP.",
	},
	{
		title: "Resumo",
		href: "/ops/resumo",
		description: "Todas as OPs em um lugar.",
	},
	{
		title: "Adicionar Item",
		href: "/ops/itens/adicionar",
		description: "Adicionar Item em uma OP.",
	},
	{
		title: "Pdf",
		href: "/ops/pdf",
		description: "Ache o pdf de uma op ou plano de corte",
	},
	{
		title: "Faturar Op",
		href: "/ops/faturar",
		description: "Fature totalmente ou parcialmente uma Opp.",
	},
];

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Cargos",
		href: "/roles",
		description: "Todos os cargos em um lugar.",
	},
	{
		title: "Adicionar Cargo",
		href: "/roles/adicionar",
		description: "Adicione um novo cargo",
	},
	{
		title: "Adicionar Cargo no usuário",
		href: "/roles/user/adicionar",
		description: "Adicione um novo cargo em um usuário",
	},
];

export function Topbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>OPs</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							{ops.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Cargos</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<a href="/auth/logout">
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Sair
						</NavigationMenuLink>
					</a>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
