"use client"

import { useTranslations } from "next-intl"

import { Form, FormField } from "@ui/form"
import { Select } from "@ui/select"

import { paymentMethodFormSchema, paymentMethodSelectItems } from "./constants"
import { type TPaymentMethod } from "./types"

type Props = { onSubmit: (shippingMethod: TPaymentMethod) => void }

export const PaymentMethodForm = ({ onSubmit }: Props) => {
	const t = useTranslations()

	return (
		<Form
			schema={paymentMethodFormSchema}
			defaultValues={{}}
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
