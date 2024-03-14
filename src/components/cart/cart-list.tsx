import { type ProductDTO } from "@models/product"

import { CartItem } from "./cart-item"

type Props = { products: ProductDTO[]; onRemove: (id: string) => void }

export const CartList = ({ products, onRemove }: Props) => {
	const handleRemove = (id: string) => () => {
		onRemove(id)
	}

	if (!products.length) {
		return (
			<section className="flex h-full flex-grow items-center justify-center">
				<h2>No products!</h2>
			</section>
		)
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
