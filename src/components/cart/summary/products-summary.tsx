import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { ProductItem } from "@components/product/product-item"
import { type ProductDTO } from "@models/product"

type Props = { products: ProductDTO[] }

export const ProductsSummary = ({ products }: Props) => {
	const t = useTranslations()

	return (
		<section className="flex flex-row">
			<h2>{t(`routes.${ROUTES.CART}`)}</h2>
			<div className="flex flex-col">
				{products.map((product, index) => (
					<ProductItem product={product} no={index + 1} key={product.id} />
				))}
			</div>
		</section>
	)
}
