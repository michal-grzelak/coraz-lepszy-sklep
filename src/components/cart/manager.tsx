"use client"

import { type ReactNode, createContext, useState, useContext } from "react"

import { type TAddProduct } from "@components/product/types"
import { generateUid } from "@lib/id"
import { type ProductDTO } from "@models/product"

type CartStore = {
	products: ProductDTO[]
	addProduct: (product: TAddProduct) => void
	removeProduct: (id: string) => void
}

const useCreateCartStore = (): CartStore => {
	const [products, setProducts] = useState<ProductDTO[]>([])

	const addProduct = (product: TAddProduct) => {
		setProducts((current) => [...current, { ...product, id: generateUid() }])
	}

	const removeProduct = (id: string) => {
		setProducts((current) => current.filter((product) => product.id !== id))
	}

	return {
		products,
		addProduct,
		removeProduct,
	}
}
const CartContext = createContext<CartStore | undefined>(undefined)

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
	const manager = useCreateCartStore()

	return <CartContext.Provider value={manager}>{children}</CartContext.Provider>
}

export const useCartManager = () => useContext(CartContext)!
