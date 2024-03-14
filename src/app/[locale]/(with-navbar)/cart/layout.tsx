import { type ReactNode } from "react"

import { CartContextProvider } from "@components/cart/manager"

export default function CartLayout({ children }: { children: ReactNode }) {
	return <CartContextProvider>{children}</CartContextProvider>
}
