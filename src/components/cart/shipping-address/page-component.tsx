"use client"

import { ShippingAddressForm } from "@components/shipping/shipping-address-form"
import { type TShippingAddress } from "@components/shipping/types"

import { useCartManager } from "../manager"

export const ShippingAddressPageComponent = () => {
	const { setAddress } = useCartManager()

	const handleSubmit = (address: TShippingAddress) => {
		setAddress(address)
	}

	return (
		<>
			<ShippingAddressForm onSubmit={handleSubmit} />
		</>
	)
}
