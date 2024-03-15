import { useMutation } from "@tanstack/react-query"

import { type Address } from "@models/address"
import { type PaymentMethod } from "@models/payment"
import { type ProductDTO } from "@models/product"
import { type ShippingMethod } from "@models/shipping"

export type PostApi = {
	products: ProductDTO[]
	address: Address
	shippingMethod?: ShippingMethod
	paymentMethod?: PaymentMethod
}

const postCart = async (data: PostApi) =>
	fetch(process.env.NEXT_PUBLIC_BASE_API_URL, { method: "POST", body: JSON.stringify(data) })

export const usePostCart = () =>
	useMutation({
		mutationKey: ["cart", "submit"],
		mutationFn: postCart,
	})
