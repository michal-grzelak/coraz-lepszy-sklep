import { type ReactNode } from "react"

import { CartContextProvider } from "@/state/cart/manager"

import { CartNavigation } from "@components/cart/cart-navigation"

export default function CartLayout({ children }: { children: ReactNode }) {
	return (
		<CartContextProvider>
			<CartNavigation />
			{children}
		</CartContextProvider>
	)
}
