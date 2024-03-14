"use client"

import { type ProductDTO } from "@models/product"
import { Checkbox } from "@ui/checkbox"
import { Form, FormField } from "@ui/form"
import { Input } from "@ui/input"

import { addProductToCartFormSchema } from "./constants"

type Props = { onSubmit: (product: ProductDTO) => void }

export const AddProductForm = ({ onSubmit }: Props) => {
	return (
		<Form
			schema={addProductToCartFormSchema}
			defaultValues={{
				name: "",
				price: 0,
				requiresShipping: false,
			}}
			onSubmit={onSubmit}
			className="grid-cols-4"
		>
			<FormField name="name" label="Name" className="col-span-4">
				<Input placeholder="Product name" />
			</FormField>
			<FormField name="price" label="Price" className="col-span-4">
				<Input placeholder="Price" />
			</FormField>
			<FormField
				name="requiresShipping"
				label="Requires shipping?"
				className="col-span-4"
				isSingleline
			>
				<Checkbox />
			</FormField>
		</Form>
	)
}
