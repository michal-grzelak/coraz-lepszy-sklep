"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { PaymentMethodSummary } from "@components/payment/payment-method-summary"
import { ShippingAddressSummary } from "@components/shipping/shipping-address-summary"
import { ShippingMethodSummary } from "@components/shipping/shipping-method-summary"

import { CartSummary } from "../cart-summary"
import { useCartManager } from "../manager"

export const SummaryPageComponent = () => {
	const t = useTranslations()
	const { products, address, shippingMethod, paymentMethod } = useCartManager()

	return (
		<>
			<h1 className="text-3xl font-bold">{t(`routes.${ROUTES.SUMMARY}`)}</h1>

			<CartSummary products={products} />

			<ShippingAddressSummary address={address!} />

			<ShippingMethodSummary shippingMethod={shippingMethod} />

			<PaymentMethodSummary paymentMethod={paymentMethod} />
		</>
	)
}
