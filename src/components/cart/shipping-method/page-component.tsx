"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ShippingMethodForm } from "@components/shipping/shipping-method-form"
import { type TShippingMethod } from "@components/shipping/types"

import { useCartManager } from "../manager"

export const ShippingMethodPageComponent = () => {
	const t = useTranslations()
	const { setShippingMethod, address } = useCartManager()

	const handleSubmit = (shippingMethod: TShippingMethod) => {
		setShippingMethod(shippingMethod)
	}

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.SHIPPING_METHOD}`)}</h1>

			<ShippingMethodForm onSubmit={handleSubmit} selectedCountry={address?.country} />
		</>
	)
}
