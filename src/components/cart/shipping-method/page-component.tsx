"use client"

import { ShippingMethodForm } from "@components/shipping/shipping-method-form"
import { type TShippingMethod } from "@components/shipping/types"

import { useCartManager } from "../manager"

export const ShippingMethodPageComponent = () => {
	const { setShippingMethod, address } = useCartManager()

	const handleSubmit = (shippingMethod: TShippingMethod) => {
		setShippingMethod(shippingMethod)
	}

	return (
		<>
			<ShippingMethodForm onSubmit={handleSubmit} selectedCountry={address?.country} />
		</>
	)
}
