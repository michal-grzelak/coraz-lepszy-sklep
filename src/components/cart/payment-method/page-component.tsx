"use client"

import { PaymentMethodForm } from "@components/payment/payment-method-form"
import { type TPaymentMethod } from "@components/payment/types"

import { useCartManager } from "../manager"

export const PaymentMethodPageComponent = () => {
	const { setPaymentMethod } = useCartManager()

	const handleSubmit = (paymentMethod: TPaymentMethod) => {
		setPaymentMethod(paymentMethod)
	}

	return (
		<>
			<PaymentMethodForm onSubmit={handleSubmit} />
		</>
	)
}
