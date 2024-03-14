import { type ProductDTO } from "@models/product"

import { CartItem } from "./cart-item"

type Props = { products: ProductDTO[]; onRemove: (id: string) => void }

export const CartList = ({ products, onRemove }: Props) => {
	const handleRemove = (id: string) => () => {
		onRemove(id)
	}

	return products.map((product, index) => (
		<CartItem
			product={product}
			no={index + 1}
			onRemove={handleRemove(product.id)}
			key={product.id}
		/>
	))
}
