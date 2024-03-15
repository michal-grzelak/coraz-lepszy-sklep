import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ActiveLink } from "@ui/active-link"

export const Navbar = () => {
	const t = useTranslations()

	return (
		<nav>
			<ul className="flex items-center p-small">
				<li className="mr-normal">
					<ActiveLink href={ROUTES.CART} exact={false}>
						{t(`routes.${ROUTES.CART}.title`)}
					</ActiveLink>
				</li>
			</ul>
		</nav>
	)
}
