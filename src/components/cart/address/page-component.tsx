"use client"

import { ShippingAddressForm } from "@components/address/shipping-address-form"
import { type TShippingAddress } from "@components/address/types"

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
