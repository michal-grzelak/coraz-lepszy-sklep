"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ShippingAddressForm } from "@components/shipping/shipping-address-form"
import { type TShippingAddress } from "@components/shipping/types"
import { useCartManager } from "@state/cart/manager"

export const ShippingAddressPageComponent = () => {
	const t = useTranslations()
	const { setAddress, address } = useCartManager()
	const router = useRouter()

	const handleSubmit = (address: TShippingAddress) => {
		setAddress(address)
		router.push(ROUTES.SHIPPING_METHOD)
	}
	8
	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.SHIPPING_ADDRESS}.title`)}</h1>

			<ShippingAddressForm onSubmit={handleSubmit} initial={address} />
		</>
	)
}
