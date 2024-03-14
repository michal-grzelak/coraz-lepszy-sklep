"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ShippingAddressForm } from "@components/shipping/shipping-address-form"
import { type TShippingAddress } from "@components/shipping/types"

import { useCartManager } from "../manager"

export const ShippingAddressPageComponent = () => {
	const t = useTranslations()
	const { setAddress } = useCartManager()

	const handleSubmit = (address: TShippingAddress) => {
		setAddress(address)
	}

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.SHIPPING_ADDRESS}`)}</h1>

			<ShippingAddressForm onSubmit={handleSubmit} />
		</>
	)
}
