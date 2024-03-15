"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { type CartState, useCartManager } from "@state/cart/manager"
import { ActiveLink } from "@ui/active-link"
import { Button } from "@ui/button"

const routes: { route: string; checkKey: keyof CartState["allowedRoutes"] }[] = [
	{ route: ROUTES.CART, checkKey: "canGoToCart" },
	{ route: ROUTES.SHIPPING_ADDRESS, checkKey: "canGoToAddress" },
	{ route: ROUTES.SHIPPING_METHOD, checkKey: "canGoToShipmentMethod" },
	{ route: ROUTES.PAYMENT_METHOD, checkKey: "canGoToPaymentMethod" },
	{ route: ROUTES.SUMMARY, checkKey: "canGoToSummary" },
]

export const CartNavigation = () => {
	const t = useTranslations()
	const { allowedRoutes } = useCartManager()

	return (
		<nav>
			<ul className="flex justify-center gap-normal max-md:flex-col max-md:items-center">
				{routes.map((route, index) => {
					const disabled = !allowedRoutes[route.checkKey]

					return (
						<li className="max-md:w-full" key={route.route}>
							<Button
								variant="default"
								disabled={disabled}
								asChild={!disabled}
								className="max-md:w-full"
							>
								<ActiveLink href={route.route} disabled={disabled}>
									{index + 1}. {t(`routes.${route.route}`)}
								</ActiveLink>
							</Button>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
