import { assign as _assign, setup } from "xstate"

import { generateUid } from "@lib/id"

import {
	CartMachineState,
	type CartMachineContext,
	type CartMachineEvent,
	EventType,
	type AddProductEvent,
	type RemoveProductEvent,
	type AddressEvent,
	type SelectShippingEvent,
	type SkipShippingEvent,
	type SelectPaymentEvent,
	type SkipPaymentEvent,
} from "./types"

type TAssign<T> = typeof _assign<CartMachineContext, CartMachineEvent, T, CartMachineEvent, never>

const assign = <T = never>(args: Parameters<TAssign<T>>[0]) => (_assign as TAssign<T>)(args)

export const cartMachine = setup({
	types: {
		context: {} as CartMachineContext,
		events: {} as CartMachineEvent,
	},
	actions: {
		addProduct: assign<AddProductEvent>({
			products: ({ context }, params) => [
				...context.products,
				{ ...params.product, id: generateUid() },
			],
		}),
		removeProduct: assign<RemoveProductEvent>({
			products: ({ context }, params) =>
				context.products.filter((product) => product.id !== params.id),
		}),
		address: assign<AddressEvent>({
			address: (_, params) => params.address,
		}),
		selectShipping: assign<SelectShippingEvent>({
			shippingMethod: (_, params) => params.shippingMethod.shippingMethod,
		}),
		skipShipping: assign<SkipShippingEvent>({
			shippingMethod: () => undefined,
		}),
		selectPayment: assign<SelectPaymentEvent>({
			paymentMethod: (_, params) => params.paymentMethod.paymentMethod,
		}),
		skipPayment: assign<SkipPaymentEvent>({
			paymentMethod: () => undefined,
		}),
	},
	guards: {
		canSkipShipping: ({ context }) => {
			if (context.products.some((product) => product.requiresShipping)) {
				return false
			}

			return true
		},
		canAddress: ({ context }) => !!context.products.length,
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
				[EventType.ADD_PRODUCT]: {
					actions: [{ type: "addProduct", params: ({ event }) => event }],
				},
				[EventType.REMOVE_PRODUCT]: {
					actions: [{ type: "removeProduct", params: ({ event }) => event }],
				},
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
					guard: "canAddress",
					actions: [{ type: "address", params: ({ event }) => event }],
				},
			},
		},
		[CartMachineState.ADDRESSED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
					actions: [{ type: "address", params: ({ event }) => event }],
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
					actions: [{ type: "selectShipping", params: ({ event }) => event }],
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
					guard: "canSkipShipping",
					actions: [{ type: "skipShipping", params: ({ event }) => event }],
				},
			},
		},
		[CartMachineState.SHIPPING_SELECTED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
					actions: [{ type: "address", params: ({ event }) => event }],
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
					actions: [{ type: "selectShipping", params: ({ event }) => event }],
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
					guard: "canSkipShipping",
					actions: [{ type: "skipShipping", params: ({ event }) => event }],
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
					actions: [{ type: "selectPayment", params: ({ event }) => event }],
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
					actions: [{ type: "skipPayment", params: ({ event }) => event }],
				},
			},
		},
		[CartMachineState.SHIPPING_SKIPPED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
					actions: [{ type: "address", params: ({ event }) => event }],
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
					actions: [{ type: "selectShipping", params: ({ event }) => event }],
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
					guard: "canSkipShipping",
					actions: [{ type: "skipShipping", params: ({ event }) => event }],
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
					actions: [{ type: "selectPayment", params: ({ event }) => event }],
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
					actions: [{ type: "skipPayment", params: ({ event }) => event }],
				},
			},
		},
		[CartMachineState.PAYMENT_SELECTED]: {
			on: {
				[EventType.ADDRESS]: {
					target: CartMachineState.ADDRESSED,
					actions: [{ type: "address", params: ({ event }) => event }],
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
					actions: [{ type: "selectShipping", params: ({ event }) => event }],
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
					guard: "canSkipShipping",
					actions: [{ type: "skipShipping", params: ({ event }) => event }],
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
					actions: [{ type: "selectPayment", params: ({ event }) => event }],
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
					actions: [{ type: "skipPayment", params: ({ event }) => event }],
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
					actions: [{ type: "address", params: ({ event }) => event }],
				},
				[EventType.SELECT_SHIPPING]: {
					target: CartMachineState.SHIPPING_SELECTED,
					actions: [{ type: "selectShipping", params: ({ event }) => event }],
				},
				[EventType.SKIP_SHIPPING]: {
					target: CartMachineState.SHIPPING_SKIPPED,
					guard: "canSkipShipping",
					actions: [{ type: "skipShipping", params: ({ event }) => event }],
				},
				[EventType.SELECT_PAYMENT]: {
					target: CartMachineState.PAYMENT_SELECTED,
					actions: [{ type: "selectPayment", params: ({ event }) => event }],
				},
				[EventType.SKIP_PAYMENT]: {
					target: CartMachineState.PAYMENT_SKIPPED,
					actions: [{ type: "skipPayment", params: ({ event }) => event }],
				},
				[EventType.COMPLETE]: {
					target: CartMachineState.COMPLETED,
				},
			},
		},
		[CartMachineState.COMPLETED]: {},
	},
})
