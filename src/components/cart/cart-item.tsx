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
		<section className="grid grid-cols-4 gap-normal">
			<span className="col-span-3">
				<ProductItem product={product} no={no} />
			</span>

			<Button variant="destructive" size="icon" onClick={onRemove} className="justify-self-end">
				<Trash2 />
			</Button>
		</section>
	)
}
