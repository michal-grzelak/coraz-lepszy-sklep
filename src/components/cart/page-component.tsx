"use client"

import { AddProductForm } from "@components/product/add-product-form"
import { type TAddProduct } from "@components/product/types"

import { CartList } from "./cart-list"
import { useCartManager } from "./manager"

export const CartPageComponent = () => {
	const { products, addProduct, removeProduct } = useCartManager()

	const handleSubmit = (product: TAddProduct) => {
		addProduct(product)
	}

	const handleRemove = (id: string) => {
		removeProduct(id)
	}

	return (
		<>
			<AddProductForm onSubmit={handleSubmit} />

			<CartList products={products} onRemove={handleRemove} />
		</>
	)
}
