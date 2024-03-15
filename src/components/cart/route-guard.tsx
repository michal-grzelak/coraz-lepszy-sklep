"use client"

import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useLayoutEffect } from "react"

import { ROUTES } from "@/routes"

import { type CartState, useCartManager } from "@state/cart/manager"
import { type CartMachineState } from "@state/cart/types"

type Props = { children: ReactNode }

const ALLOWED_ROUTES_FOR_STATE: Record<
	CartMachineState,
	{ routes: (typeof ROUTES)[keyof typeof ROUTES][]; checks?: (keyof CartState["allowedRoutes"])[] }
> = {
	CART: { routes: [ROUTES.CART, ROUTES.SHIPPING_ADDRESS], checks: ["canGoToAddress"] },
	ADDRESSED: { routes: [ROUTES.SHIPPING_METHOD, ROUTES.SHIPPING_ADDRESS] },
	SHIPPING_SELECTED: {
		routes: [ROUTES.PAYMENT_METHOD, ROUTES.SHIPPING_METHOD, ROUTES.SHIPPING_ADDRESS],
	},
	SHIPPING_SKIPPED: {
		routes: [ROUTES.PAYMENT_METHOD, ROUTES.SHIPPING_METHOD, ROUTES.SHIPPING_ADDRESS],
	},
	PAYMENT_SELECTED: {
		routes: [
			ROUTES.SUMMARY,
			ROUTES.PAYMENT_METHOD,
			ROUTES.SHIPPING_METHOD,
			ROUTES.SHIPPING_ADDRESS,
		],
	},
	PAYMENT_SKIPPED: {
		routes: [
			ROUTES.SUMMARY,
			ROUTES.PAYMENT_METHOD,
			ROUTES.SHIPPING_METHOD,
			ROUTES.SHIPPING_ADDRESS,
		],
	},
	COMPLETED: { routes: [ROUTES.COMPLETE] },
}

export const RouteGuard = ({ children }: Props) => {
	const pathname = usePathname()
	const router = useRouter()
	const { currentState, allowedRoutes } = useCartManager()

	useLayoutEffect(() => {
		const allowedConfig = ALLOWED_ROUTES_FOR_STATE[currentState]
		const isLegalPath = allowedConfig.routes.includes(pathname)
		const passedChecks =
			!allowedConfig.checks || allowedConfig.checks.every((check) => allowedRoutes[check])

		if (!isLegalPath || !passedChecks) {
			const stateDefaultPath = allowedConfig.routes[0]
			router.replace(stateDefaultPath)
		}
	}, [allowedRoutes, currentState, pathname, router])

	return children
}
