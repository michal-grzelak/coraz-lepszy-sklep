"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ShippingMethodForm } from "@components/shipping/shipping-method-form"
import { type TShippingMethod } from "@components/shipping/types"
import { useCartManager } from "@state/cart/manager"
import { Button } from "@ui/button"

export const ShippingMethodPageComponent = () => {
	const t = useTranslations()
	const {
		setShippingMethod,
		skipShipping: _skipShipping,
		address,
		allowedRoutes: { canSkipShipping },
	} = useCartManager()
	const router = useRouter()

	const handleSubmit = (shippingMethod: TShippingMethod) => {
		setShippingMethod(shippingMethod)
		router.push(ROUTES.PAYMENT_METHOD)
	}

	const skipShipping = () => {
		_skipShipping()
		router.push(ROUTES.PAYMENT_METHOD)
	}

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.SHIPPING_METHOD}`)}</h1>

			<ShippingMethodForm onSubmit={handleSubmit} selectedCountry={address?.country} />

			<Button onClick={skipShipping} disabled={!canSkipShipping}>
				{t("domain.shipping.actions.skip")}
			</Button>
		</>
	)
}
