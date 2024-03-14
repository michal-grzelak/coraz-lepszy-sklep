"use client"

import { useTranslations } from "next-intl"

import { Checkbox } from "@ui/checkbox"
import { Form, FormField } from "@ui/form"
import { Input } from "@ui/input"

import { addProductToCartFormSchema } from "./constants"
import { type TAddProduct } from "./types"

type Props = { onSubmit: (product: TAddProduct) => void }

export const AddProductForm = ({ onSubmit }: Props) => {
	const t = useTranslations()

	return (
		<Form
			schema={addProductToCartFormSchema}
			defaultValues={{
				name: "",
				price: 0,
				requiresShipping: false,
			}}
			onSubmit={onSubmit}
			submitText={t("domain.product.actions.add")}
			className="grid-cols-4"
		>
			<FormField
				name="name"
				label={t("domain.product.name.label")}
				className="col-span-2 max-md:col-span-4"
			>
				<Input placeholder={t("domain.product.name.placeholder")} />
			</FormField>
			<FormField
				name="price"
				label={t("domain.product.price.label")}
				className="col-span-2 max-md:col-span-4"
			>
				<Input placeholder={t("domain.product.price.placeholder")} type="number" />
			</FormField>
			<FormField
				name="requiresShipping"
				label={t("domain.product.requiresShipping.label")}
				className="col-span-4"
				isSingleline
				type="checkbox"
			>
				<Checkbox />
			</FormField>
		</Form>
	)
}
