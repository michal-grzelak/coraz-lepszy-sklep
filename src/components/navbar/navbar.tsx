import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ActiveLink } from "@ui/active-link"

export const Navbar = () => {
	const t = useTranslations()

	return (
		<nav>
			<ul className="flex items-center justify-between p-small">
				<li className="mr-normal">
					<ActiveLink href={ROUTES.CART} exact={false}>
						{t(`routes.${ROUTES.CART}.title`)}
					</ActiveLink>
				</li>

				<li className="">
					<h1 className="text-4xl font-bold">Coraz Lepszy Sklep</h1>
				</li>

				<li></li>
			</ul>
		</nav>
	)
}
