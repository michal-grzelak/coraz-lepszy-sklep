"use client"

import { type ProductDTO } from "@models/Product"

import { AddProductForm } from "@components/Product/AddProductForm"

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
