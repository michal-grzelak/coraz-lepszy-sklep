import { assign, setup } from "xstate"

import { type TPaymentMethod } from "@components/payment/types"
import { type TAddProduct } from "@components/product/types"
import { type TShippingAddress, type TShippingMethod } from "@components/shipping/types"
import { generateUid } from "@lib/id"
import { type Address } from "@models/address"
import { type PaymentMethod } from "@models/payment"
import { type ProductDTO } from "@models/product"
import { type ShippingMethod } from "@models/shipping"

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

export interface CartMachineContext {
	products: ProductDTO[]
	address?: Address
	shippingMethod?: ShippingMethod
	paymentMethod?: PaymentMethod
}

export const cartMachine = setup({
	types: {
		context: {} as CartMachineContext,
		events: {} as
			| { type: EventType.ADD_PRODUCT; product: TAddProduct }
			| { type: EventType.REMOVE_PRODUCT; id: string }
			| { type: EventType.ADDRESS; address: TShippingAddress }
			| { type: EventType.SELECT_SHIPPING; shippingMethod: TShippingMethod }
			| { type: EventType.SKIP_SHIPPING }
			| { type: EventType.SELECT_PAYMENT; paymentMethod: TPaymentMethod }
			| { type: EventType.SKIP_PAYMENT }
			| { type: EventType.COMPLETE },
	},
}).createMachine({
	id: "cart",
	initial: CartMachineState.CART,
	context: {
		products: [],
	},
	states: {
		[CartMachineState.CART]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
				},
			},
		},
		[CartMachineState.ADDRESSED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
				},
			},
		},
		[CartMachineState.SHIPPING_SELECTED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
				},
			},
		},
		[CartMachineState.SHIPPING_SKIPPED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
				},
			},
		},
		[CartMachineState.PAYMENT_SELECTED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
				},
				[EventType.COMPLETE]: {
					target: CartMachineState.COMPLETED,
				},
			},
		},
		[CartMachineState.PAYMENT_SKIPPED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
				},
				[EventType.COMPLETE]: {
					target: CartMachineState.COMPLETED,
				},
			},
		},
		[CartMachineState.COMPLETED]: {},
	},
	on: {
		[EventType.ADD_PRODUCT]: {
			actions: assign({
				products: ({ context, event }) => [
					...context.products,
					{ ...event.product, id: generateUid() },
				],
			}),
		},
		[EventType.REMOVE_PRODUCT]: {
			actions: assign({
				products: ({ context, event }) =>
					context.products.filter((product) => product.id !== event.id),
			}),
		},
		[EventType.ADDRESS]: {
			// target: CartState.ADDRESSED,
			actions: assign({
				address: ({ event }) => event.address,
			}),
		},
		[EventType.SELECT_SHIPPING]: {
			// target: CartState.SHIPPING_SELECTED,
			actions: assign({
				shippingMethod: ({ event }) => event.shippingMethod.shippingMethod,
			}),
		},
		[EventType.SKIP_SHIPPING]: {
			// target: CartState.SHIPPING_SKIPPED,
			actions: assign({
				shippingMethod: () => undefined,
			}),
		},
		[EventType.SELECT_PAYMENT]: {
			// target: CartState.PAYMENT_SELECTED,
			actions: assign({
				paymentMethod: ({ event }) => event.paymentMethod.paymentMethod,
			}),
		},
		[EventType.SKIP_PAYMENT]: {
			// target: CartState.PAYMENT_SKIPPED,
			actions: assign({
				paymentMethod: () => undefined,
			}),
		},
	},
})
