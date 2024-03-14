"use client"

import { AddProductForm } from "@components/product/add-product-form"
import { CartItem } from "@components/product/cart-item"
import { type TAddProduct } from "@components/product/types"

import { useCartManager } from "./manager"

export const CartPageComponent = () => {
	const { products, addProduct } = useCartManager()

	const handleSubmit = (product: TAddProduct) => {
		addProduct(product)
		console.log(product)
	}

	return (
		<>
			<AddProductForm onSubmit={handleSubmit} />

			{products.map((product, index) => (
				<CartItem product={product} key={product.id} no={index + 1} />
			))}
		</>
	)
}
