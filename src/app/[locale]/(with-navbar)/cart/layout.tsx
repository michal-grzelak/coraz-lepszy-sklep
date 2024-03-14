import { type ReactNode } from "react"

import { CartContextProvider } from "@/state/cart/manager"

export default function CartLayout({ children }: { children: ReactNode }) {
	return <CartContextProvider>{children}</CartContextProvider>
}
