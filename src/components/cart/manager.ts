import { useState } from "react"

import { type TAddProduct } from "@components/product/types"
import { generateUid } from "@lib/id"
import { type ProductDTO } from "@models/product"

export const useCartManager = () => {
	const [products, setProducts] = useState<ProductDTO[]>([])

	const addProduct = (product: TAddProduct) => {
		setProducts((current) => [...current, { ...product, id: generateUid() }])
	}

	const removeProduct = (id: string) => {
		setProducts((current) => current.filter((product) => product.id !== id))
	}

	return {
		products,
		addProduct,
		removeProduct,
	}
}
