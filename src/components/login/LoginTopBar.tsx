import { Link } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function LoginTopbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link to="/login">
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Logar
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to="/register">
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Registrar
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
