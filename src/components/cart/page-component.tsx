"use client"

import { AddProductForm } from "@components/product/add-product-form"
import { CartItemInteractive } from "@components/product/cart-item-interactive"
import { type TAddProduct } from "@components/product/types"

import { useCartManager } from "./manager"

export const CartPageComponent = () => {
	const { products, addProduct, removeProduct } = useCartManager()

	const handleSubmit = (product: TAddProduct) => {
		addProduct(product)
	}

	const handleRemove = (id: string) => () => {
		removeProduct(id)
	}

	return (
		<>
			<AddProductForm onSubmit={handleSubmit} />

			{products.map((product, index) => (
				<CartItemInteractive
					product={product}
					no={index + 1}
					onRemove={handleRemove(product.id)}
					key={product.id}
				/>
			))}
		</>
	)
}
