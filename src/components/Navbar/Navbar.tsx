import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ActiveLink } from "@ui/ActiveLink"

export const Navbar = () => {
	const t = useTranslations()

	return (
		<nav>
			<ul className="flex items-center p-small">
				<li className="mr-normal">
					<ActiveLink href={ROUTES.CART}>{t(`routes.${ROUTES.CART}`)}</ActiveLink>
				</li>
			</ul>
		</nav>
	)
}
