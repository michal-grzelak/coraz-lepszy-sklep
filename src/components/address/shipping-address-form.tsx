"use client"

import { useTranslations } from "next-intl"

import { Form, FormField } from "@ui/form"
import { Input } from "@ui/input"
import { Select } from "@ui/select"

import { countrySelectItems, shippingAddressFormSchema } from "./constants"
import { type TShippingAddress } from "./types"

type Props = { onSubmit: (product: TShippingAddress) => void }

export const ShippingAddressForm = ({ onSubmit }: Props) => {
	const t = useTranslations()

	return (
		<Form
			schema={shippingAddressFormSchema}
			defaultValues={{
				city: "",
				street: "",
			}}
			onSubmit={onSubmit}
			submitText={t("domain.address.actions.add")}
			className="grid-cols-4"
		>
			<FormField
				name="country"
				label={t("domain.address.country.label")}
				className="col-span-2 max-md:col-span-4"
				type="select"
			>
				<Select placeholder={t("domain.address.country.placeholder")} items={countrySelectItems} />
			</FormField>
			<FormField
				name="city"
				label={t("domain.address.city.label")}
				className="col-span-2 max-md:col-span-4"
			>
				<Input placeholder={t("domain.address.city.placeholder")} />
			</FormField>
			<FormField
				name="street"
				label={t("domain.address.street.label")}
				className="col-span-2 max-md:col-span-4"
			>
				<Input placeholder={t("domain.address.street.placeholder")} />
			</FormField>
		</Form>
	)
}
