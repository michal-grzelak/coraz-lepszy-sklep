"use client"

import { useTranslations } from "next-intl"

import { type ProductDTO } from "@models/product"

type Props = {
	product: ProductDTO
	no: number
}

export const ProductItem = ({ product: { name, price, requiresShipping }, no }: Props) => {
	const t = useTranslations()

	return (
		<section className="flex flex-row gap-normal">
			<span>{no}.</span>
			<div className="flex flex-col">
				<p className="font-bold">{name}</p>
				<div className="flex items-center gap-small">
					<p>
						{t("domain.product.price.value", {
							price,
						})}
					</p>
					<p className="text-destructive">
						{t("domain.product.requiresShipping.value", { requiresShipping })}
					</p>
				</div>
			</div>
		</section>
	)
}
