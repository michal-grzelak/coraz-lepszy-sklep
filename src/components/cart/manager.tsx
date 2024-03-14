"use client"

import { type ReactNode, createContext, useState, useContext } from "react"

import { type TShippingAddress } from "@components/address/types"
import { type TAddProduct } from "@components/product/types"
import { generateUid } from "@lib/id"
import { type Address } from "@models/address"
import { type ProductDTO } from "@models/product"

type CartStore = {
	products: ProductDTO[]
	address?: Address
	addProduct: (product: TAddProduct) => void
	removeProduct: (id: string) => void
	setAddress: (address: TShippingAddress) => void
}

const useCreateCartStore = (): CartStore => {
	const [products, setProducts] = useState<ProductDTO[]>([])
	const [address, _setAddress] = useState<Address | undefined>()

	const addProduct = (product: TAddProduct) => {
		setProducts((current) => [...current, { ...product, id: generateUid() }])
	}

	const removeProduct = (id: string) => {
		setProducts((current) => current.filter((product) => product.id !== id))
	}

	const setAddress = (address: TShippingAddress) => {
		_setAddress(address)
	}

	return {
		products,
		address,
		addProduct,
		removeProduct,
		setAddress,
	}
}
const CartContext = createContext<CartStore | undefined>(undefined)

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
	const manager = useCreateCartStore()

	return <CartContext.Provider value={manager}>{children}</CartContext.Provider>
}

export const useCartManager = () => useContext(CartContext)!
