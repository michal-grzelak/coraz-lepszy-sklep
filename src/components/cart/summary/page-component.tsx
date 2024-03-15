"use client"

import { usePostCart } from "@api/cartApi"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { PaymentMethodSummary } from "@components/payment/payment-method-summary"
import { ShippingAddressSummary } from "@components/shipping/shipping-address-summary"
import { ShippingMethodSummary } from "@components/shipping/shipping-method-summary"
import { useCartManager } from "@state/cart/manager"
import { Button } from "@ui/button"

import { CartSummary } from "../cart-summary"

export const SummaryPageComponent = () => {
	const t = useTranslations()
	const router = useRouter()
	const { products, address, shippingMethod, paymentMethod, complete } = useCartManager()
	const { mutate: submitCart, isPending } = usePostCart()

	const handleSubmit = () => {
		submitCart(
			{ products, address: address!, shippingMethod, paymentMethod },
			{
				onSuccess: () => {
					complete()
					router.push(ROUTES.COMPLETE)
				},
			},
		)
	}

	return (
		<>
			<h1 className="text-3xl font-bold">{t(`routes.${ROUTES.SUMMARY}`)}</h1>

			<CartSummary products={products} />

			<ShippingAddressSummary address={address!} />

			<ShippingMethodSummary shippingMethod={shippingMethod} />

			<PaymentMethodSummary paymentMethod={paymentMethod} />

			<Button onClick={handleSubmit} loading={isPending}>
				{t("common.submit")}
			</Button>
		</>
	)
}
