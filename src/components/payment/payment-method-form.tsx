"use client"

import { useTranslations } from "next-intl"

import { type PaymentMethod } from "@models/payment"
import { Form, FormField } from "@ui/form"
import { Select } from "@ui/select"

import { paymentMethodFormSchema, paymentMethodSelectItems } from "./constants"
import { type TPaymentMethod } from "./types"

type Props = {
	onSubmit: (shippingMethod: TPaymentMethod) => void
	initial?: PaymentMethod
}

export const PaymentMethodForm = ({ onSubmit, initial }: Props) => {
	const t = useTranslations()

	return (
		<Form
			schema={paymentMethodFormSchema}
			defaultValues={initial ? { paymentMethod: initial } : {}}
			onSubmit={onSubmit}
			submitText={t("domain.payment.actions.add")}
			className="grid-cols-4"
		>
			<FormField
				name="paymentMethod"
				label={t("domain.payment.paymentMethod.label")}
				className="col-span-4"
				type="select"
			>
				<Select
					placeholder={t("domain.payment.paymentMethod.placeholder")}
					items={paymentMethodSelectItems}
				/>
			</FormField>
		</Form>
	)
}
