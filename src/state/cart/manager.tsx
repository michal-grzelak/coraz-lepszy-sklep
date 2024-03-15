"use client"

import { useMachine } from "@xstate/react"
import { type ReactNode, createContext, useContext, useMemo } from "react"

import { type TPaymentMethod } from "@components/payment/types"
import { type TAddProduct } from "@components/product/types"
import { type TShippingMethod, type TShippingAddress } from "@components/shipping/types"

import { cartMachine } from "./machine"
import {
	type CartMachineContext,
	EventType,
	CartMachineState,
	type CartMachineEvent,
} from "./types"

export type CartState = Pick<
	CartMachineContext,
	"products" | "address" | "shippingMethod" | "paymentMethod"
> & {
	allowedRoutes: {
		canGoToCart: boolean
		canGoToAddress: boolean
		canGoToShipmentMethod: boolean
		canGoToPaymentMethod: boolean
		canGoToSummary: boolean
		canSkipShipping: boolean
	}
	addProduct: (product: TAddProduct) => void
	removeProduct: (id: string) => void
	setAddress: (address: TShippingAddress) => void
	setShippingMethod: (shippingMethod: TShippingMethod) => void
	skipShipping: () => void
	setPaymentMethod: (paymentMethod: TPaymentMethod) => void
	skipPayment: () => void
	complete: () => void
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

	const complete = () => {
		send({ type: EventType.COMPLETE })
	}

	const allowedRoutes: CartState["allowedRoutes"] = useMemo(
		() => ({
			canGoToCart: state.value === CartMachineState.CART,
			canGoToAddress: state.can({ type: EventType.ADDRESS } as CartMachineEvent),
			canGoToShipmentMethod: state.can({ type: EventType.SELECT_SHIPPING } as CartMachineEvent),
			canGoToPaymentMethod: state.can({ type: EventType.SELECT_PAYMENT } as CartMachineEvent),
			canGoToSummary: state.can({ type: EventType.COMPLETE } as CartMachineEvent),
			canSkipShipping: state.can({ type: EventType.SKIP_SHIPPING } as CartMachineEvent),
		}),
		[state.value, state.can],
	)

	return {
		...state.context,
		allowedRoutes,
		addProduct,
		removeProduct,
		setAddress,
		setShippingMethod,
		skipShipping,
		setPaymentMethod,
		skipPayment,
		complete,
	}
}

const CartContext = createContext<CartState | undefined>(undefined)
export const CartContextProvider = ({ children }: { children: ReactNode }) => {
	const manager = useCreateCartState()

	return <CartContext.Provider value={manager}>{children}</CartContext.Provider>
}

export const useCartManager = () => useContext(CartContext)!
