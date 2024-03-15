import { sumBy } from "lodash"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { type ProductDTO } from "@models/product"

type Props = { products: ProductDTO[] }

export const TotalPrice = ({ products }: Props) => {
	const t = useTranslations()
	const total = useMemo(() => sumBy(products, "price"), [products])

	return <p>{t("domain.product.price.total", { price: total })}</p>
}
