import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ProductItem } from "@components/product/product-item"
import { type ProductDTO } from "@models/product"

type Props = { products: ProductDTO[] }

export const CartSummary = ({ products }: Props) => {
	const t = useTranslations()

	return (
		<section className="grid grid-flow-row grid-cols-4 gap-normal">
			<h2 className="col-span-1">{t(`routes.${ROUTES.CART}.title`)}:</h2>
			<div className="flex flex-col">
				{products.map((product, index) => (
					<ProductItem product={product} no={index + 1} key={product.id} />
				))}
			</div>
		</section>
	)
}
