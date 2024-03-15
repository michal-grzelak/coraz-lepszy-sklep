import { type TPaymentMethod } from "@components/payment/types"
import { type TAddProduct } from "@components/product/types"
import { type TShippingAddress, type TShippingMethod } from "@components/shipping/types"
import { type Address } from "@models/address"
import { type PaymentMethod } from "@models/payment"
import { type ProductDTO } from "@models/product"
import { type ShippingMethod } from "@models/shipping"

export interface CartMachineContext {
	products: ProductDTO[]
	address?: Address
	shippingMethod?: ShippingMethod
	paymentMethod?: PaymentMethod
}

export enum CartMachineState {
	CART = "CART",
	ADDRESSED = "ADDRESSED",
	SHIPPING_SELECTED = "SHIPPING_SELECTED",
	SHIPPING_SKIPPED = "SHIPPING_SKIPPED",
	PAYMENT_SELECTED = "PAYMENT_SELECTED",
	PAYMENT_SKIPPED = "PAYMENT_SKIPPED",
	COMPLETED = "COMPLETED",
}

export enum EventType {
	ADD_PRODUCT = "ADD_PRODUCT",
	REMOVE_PRODUCT = "REMOVE_PRODUCT",
	ADDRESS = "ADDRESS",
	SELECT_SHIPPING = "SELECT_SHIPPING",
	SKIP_SHIPPING = "SKIP_SHIPPING",
	SELECT_PAYMENT = "SELECT_PAYMENT",
	SKIP_PAYMENT = "SKIP_PAYMENT",
	COMPLETE = "COMPLETE",
}

export type AddProductEvent = { type: EventType.ADD_PRODUCT; product: TAddProduct }
export type RemoveProductEvent = { type: EventType.REMOVE_PRODUCT; id: string }
export type AddressEvent = { type: EventType.ADDRESS; address: TShippingAddress }
export type SelectShippingEvent = {
	type: EventType.SELECT_SHIPPING
	shippingMethod: TShippingMethod
}
export type SkipShippingEvent = { type: EventType.SKIP_SHIPPING }
export type SelectPaymentEvent = { type: EventType.SELECT_PAYMENT; paymentMethod: TPaymentMethod }
export type SkipPaymentEvent = { type: EventType.SKIP_PAYMENT }
export type CompleteEvent = { type: EventType.COMPLETE }

export type CartMachineEvent =
	| AddProductEvent
	| RemoveProductEvent
	| AddressEvent
	| SelectShippingEvent
	| SkipShippingEvent
	| SelectPaymentEvent
	| SkipPaymentEvent
	| CompleteEvent
