import { type ProductDTO } from "@models/product"

type Props = {
	product: ProductDTO
	no: number
}

export const CartItem = ({ product: { name, price, requiresShipping }, no }: Props) => {
	return (
		<section className="flex flex-row gap-normal">
			<span>{no}.</span>
			<div className="flex flex-col">
				<p className="font-bold">{name}</p>
				<div className="flex items-center gap-small">
					<p>{price}</p>
					<p className="text-destructive">{requiresShipping ? "Shipping required" : ""}</p>
				</div>
			</div>
		</section>
	)
}
