import { type ReactNode } from "react"

import { CartContextProvider } from "@/state/cart/manager"

import { CartNavigation } from "@components/cart/cart-navigation"
import { RouteGuard } from "@components/cart/route-guard"

export default function CartLayout({ children }: { children: ReactNode }) {
	return (
		<CartContextProvider>
			<RouteGuard>
				<CartNavigation />
				{children}
			</RouteGuard>
		</CartContextProvider>
	)
}
