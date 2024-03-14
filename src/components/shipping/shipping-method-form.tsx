"use client"

import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { type Country } from "@models/address"
import { Form, FormField } from "@ui/form"
import { Select } from "@ui/select"

import { getShippingMethodSelectItems, shippingMethodFormSchema } from "./constants"
import { type TShippingMethod } from "./types"

type Props = { onSubmit: (shippingMethod: TShippingMethod) => void; selectedCountry?: Country }

export const ShippingMethodForm = ({ onSubmit, selectedCountry }: Props) => {
	const t = useTranslations()

	const shippingMethodSelectItems = useMemo(
		() => getShippingMethodSelectItems(selectedCountry),
		[selectedCountry],
	)

	return (
		<Form
			schema={shippingMethodFormSchema}
			defaultValues={{}}
			onSubmit={onSubmit}
			submitText={t("domain.shipping.actions.add")}
			className="grid-cols-4"
		>
			<FormField
				name="shippingMethod"
				label={t("domain.shipping.shippingMethod.label")}
				className="col-span-4"
				type="select"
			>
				<Select
					placeholder={t("domain.shipping.shippingMethod.placeholder")}
					items={shippingMethodSelectItems}
				/>
			</FormField>
		</Form>
	)
}
