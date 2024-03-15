"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { PaymentMethodForm } from "@components/payment/payment-method-form"
import { type TPaymentMethod } from "@components/payment/types"
import { useCartManager } from "@state/cart/manager"
import { Button } from "@ui/button"

export const PaymentMethodPageComponent = () => {
	const t = useTranslations()
	const { setPaymentMethod, skipPayment: _skipPayment, paymentMethod } = useCartManager()
	const router = useRouter()

	const handleSubmit = (paymentMethod: TPaymentMethod) => {
		setPaymentMethod(paymentMethod)
		router.push(ROUTES.SUMMARY)
	}

	const skipPayment = () => {
		_skipPayment()
		router.push(ROUTES.SUMMARY)
	}

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.PAYMENT_METHOD}.title`)}</h1>

			<PaymentMethodForm onSubmit={handleSubmit} initial={paymentMethod} />

			<Button onClick={skipPayment}>{t("domain.payment.actions.skip")}</Button>
		</>
	)
}
