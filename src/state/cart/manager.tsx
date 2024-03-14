"use client"

import { useMachine } from "@xstate/react"
import { type ReactNode, createContext, useContext } from "react"

import { type TPaymentMethod } from "@components/payment/types"
import { type TAddProduct } from "@components/product/types"
import { type TShippingMethod, type TShippingAddress } from "@components/shipping/types"

import { type CartMachineContext, EventType, cartMachine, type CartMachineState } from "./machine"

type CartState = Pick<
	CartMachineContext,
	"products" | "address" | "shippingMethod" | "paymentMethod"
> & {
	state: CartMachineState
	addProduct: (product: TAddProduct) => void
	removeProduct: (id: string) => void
	setAddress: (address: TShippingAddress) => void
	setShippingMethod: (shippingMethod: TShippingMethod) => void
	skipShipping: () => void
	setPaymentMethod: (paymentMethod: TPaymentMethod) => void
	skipPayment: () => void
}

const useCreateCartState = (): CartState => {
	const [state, send] = useMachine(cartMachine)

	const addProduct = (product: TAddProduct) => {
		send({ type: EventType.ADD_PRODUCT, product })
	}

	const removeProduct = (id: string) => {
		send({ type: EventType.REMOVE_PRODUCT, id })
	}

	const setAddress = (address: TShippingAddress) => {
		send({ type: EventType.ADDRESS, address })
	}

	const setShippingMethod = (shippingMethod: TShippingMethod) => {
		send({ type: EventType.SELECT_SHIPPING, shippingMethod })
	}

	const skipShipping = () => {
		send({ type: EventType.SKIP_SHIPPING })
	}

	const setPaymentMethod = (paymentMethod: TPaymentMethod) => {
		send({ type: EventType.SELECT_PAYMENT, paymentMethod })
	}

	const skipPayment = () => {
		send({ type: EventType.SKIP_PAYMENT })
	}

	return {
		...state.context,
		state: state.value,
		addProduct,
		removeProduct,
		setAddress,
		setShippingMethod,
		skipShipping,
		setPaymentMethod,
		skipPayment,
	}
}

const CartContext = createContext<CartState | undefined>(undefined)
export const CartContextProvider = ({ children }: { children: ReactNode }) => {
	const manager = useCreateCartState()

	return <CartContext.Provider value={manager}>{children}</CartContext.Provider>
}

export const useCartManager = () => useContext(CartContext)!
