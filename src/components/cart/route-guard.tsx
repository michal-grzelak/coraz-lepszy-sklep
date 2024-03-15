"use client"

import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useLayoutEffect } from "react"

import { ROUTES } from "@/routes"

import { useCartManager } from "@state/cart/manager"
import { type CartMachineState } from "@state/cart/types"

type Props = { children: ReactNode }

const ALLOWED_ROUTES_FOR_STATE: Record<CartMachineState, (typeof ROUTES)[keyof typeof ROUTES][]> = {
	CART: [ROUTES.CART, ROUTES.SHIPPING_ADDRESS],
	ADDRESSED: [ROUTES.SHIPPING_METHOD, ROUTES.SHIPPING_ADDRESS],
	SHIPPING_SELECTED: [ROUTES.PAYMENT_METHOD, ROUTES.SHIPPING_METHOD, ROUTES.SHIPPING_ADDRESS],
	SHIPPING_SKIPPED: [ROUTES.PAYMENT_METHOD, ROUTES.SHIPPING_METHOD, ROUTES.SHIPPING_ADDRESS],
	PAYMENT_SELECTED: [
		ROUTES.SUMMARY,
		ROUTES.PAYMENT_METHOD,
		ROUTES.SHIPPING_METHOD,
		ROUTES.SHIPPING_ADDRESS,
	],
	PAYMENT_SKIPPED: [
		ROUTES.SUMMARY,
		ROUTES.PAYMENT_METHOD,
		ROUTES.SHIPPING_METHOD,
		ROUTES.SHIPPING_ADDRESS,
	],
	COMPLETED: [ROUTES.COMPLETE],
}

export const RouteGuard = ({ children }: Props) => {
	const pathname = usePathname()
	const router = useRouter()
	const { currentState } = useCartManager()

	useLayoutEffect(() => {
		const isLegalPath = ALLOWED_ROUTES_FOR_STATE[currentState].includes(pathname)

		if (!isLegalPath) {
			const stateDefaultPath = ALLOWED_ROUTES_FOR_STATE[currentState][0]
			router.replace(stateDefaultPath)
		}
	}, [currentState, pathname, router])

	return children
}
