"use client"

import { type ReactNode, createContext, useState, useContext } from "react"

import { type TPaymentMethod } from "@components/payment/types"
import { type TAddProduct } from "@components/product/types"
import { type TShippingMethod, type TShippingAddress } from "@components/shipping/types"
import { generateUid } from "@lib/id"
import { type Address } from "@models/address"
import { type PaymentMethod } from "@models/payment"
import { type ProductDTO } from "@models/product"
import { type ShippingMethod } from "@models/shipping"

type CartStore = {
	products: ProductDTO[]
	address?: Address
	shippingMethod?: ShippingMethod
	paymentMethod?: PaymentMethod
	addProduct: (product: TAddProduct) => void
	removeProduct: (id: string) => void
	setAddress: (address: TShippingAddress) => void
	setShippingMethod: (shippingMethod: TShippingMethod) => void
	setPaymentMethod: (paymentMethod: TPaymentMethod) => void
}

const useCreateCartStore = (): CartStore => {
	const [products, setProducts] = useState<ProductDTO[]>([])
	const [address, _setAddress] = useState<Address>()
	const [shippingMethod, _setShippingMethod] = useState<ShippingMethod>()
	const [paymentMethod, _setPaymentMethod] = useState<PaymentMethod>()

	const addProduct = (product: TAddProduct) => {
		setProducts((current) => [...current, { ...product, id: generateUid() }])
	}

	const removeProduct = (id: string) => {
		setProducts((current) => current.filter((product) => product.id !== id))
	}

	const setAddress = (address: TShippingAddress) => {
		_setAddress(address)
	}

	const setShippingMethod = (shippingMethod: TShippingMethod) => {
		_setShippingMethod(shippingMethod.shippingMethod)
	}

	const setPaymentMethod = (paymentMethod: TPaymentMethod) => {
		_setPaymentMethod(paymentMethod.paymentMethod)
	}

	return {
		products,
		address,
		shippingMethod,
		paymentMethod,
		addProduct,
		removeProduct,
		setAddress,
		setShippingMethod,
		setPaymentMethod,
	}
}
const CartContext = createContext<CartStore | undefined>(undefined)

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
	const manager = useCreateCartStore()

	return <CartContext.Provider value={manager}>{children}</CartContext.Provider>
}

export const useCartManager = () => useContext(CartContext)!
