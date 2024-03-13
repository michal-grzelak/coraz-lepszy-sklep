import { ROUTES } from "@/routes"

import { ActiveLink } from "@ui/ActiveLink"

export const Navbar = () => {
	return (
		<nav>
			<ul className="flex items-center px-3 py-2">
				<li className="mr-4">
					<ActiveLink href={ROUTES.CART}>{ROUTES.CART}</ActiveLink>
				</li>
			</ul>
		</nav>
	)
}
