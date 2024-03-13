import { ROUTES } from "@/routes"

import { ActiveLink } from "@ui/ActiveLink"

export const Navbar = () => {
	return (
		<nav>
			<ul className="flex items-center p-small">
				<li className="mr-normal">
					<ActiveLink href={ROUTES.CART}>{ROUTES.CART}</ActiveLink>
				</li>
			</ul>
		</nav>
	)
}
