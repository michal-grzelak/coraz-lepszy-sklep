"use client"

import { Trash2 } from "lucide-react"

import { type ProductDTO } from "@models/product"
import { Button } from "@ui/button"

import { ProductItem } from "../product/product-item"

type Props = {
	product: ProductDTO
	no: number
	onRemove: () => void
}

export const CartItem = ({ product, no, onRemove }: Props) => {
	return (
		<section className="flex flex-row items-center gap-normal">
			<ProductItem product={product} no={no} />

			<Button variant="destructive" size="icon" onClick={onRemove}>
				<Trash2 />
			</Button>
		</section>
	)
}
