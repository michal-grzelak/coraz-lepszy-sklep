"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { AddProductForm } from "@components/product/add-product-form"
import { type TAddProduct } from "@components/product/types"
import { useCartManager } from "@state/cart/manager"

import { CartList } from "./cart-list"

export const CartPageComponent = () => {
	const t = useTranslations()
	const { products, addProduct, removeProduct } = useCartManager()

	const handleSubmit = (product: TAddProduct) => {
		addProduct(product)
	}

	const handleRemove = (id: string) => {
		removeProduct(id)
	}

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.CART}.title`)}</h1>

			<AddProductForm onSubmit={handleSubmit} />

			<CartList products={products} onRemove={handleRemove} />
		</>
	)
}
