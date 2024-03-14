"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { PaymentMethodForm } from "@components/payment/payment-method-form"
import { type TPaymentMethod } from "@components/payment/types"

import { useCartManager } from "../manager"

export const PaymentMethodPageComponent = () => {
	const t = useTranslations()
	const { setPaymentMethod } = useCartManager()

	const handleSubmit = (paymentMethod: TPaymentMethod) => {
		setPaymentMethod(paymentMethod)
	}

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.PAYMENT_METHOD}`)}</h1>

			<PaymentMethodForm onSubmit={handleSubmit} />
		</>
	)
}
