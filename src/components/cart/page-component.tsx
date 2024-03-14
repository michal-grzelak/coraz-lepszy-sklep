"use client"

import { AddProductForm } from "@components/product/add-product-form"
import { type ProductDTO } from "@models/product"

export const CartPageComponent = () => {
	const handleSubmit = (product: ProductDTO) => {
		console.log(product)
	}

	return (
		<>
			<AddProductForm onSubmit={handleSubmit} />
		</>
	)
}
