"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { useCartManager } from "../manager"

import { ProductsSummary } from "./products-summary"

export const SummaryPageComponent = () => {
	const t = useTranslations()
	const { products } = useCartManager()

	return (
		<>
			<h1 className="font-bold">{t(`routes.${ROUTES.SUMMARY}`)}</h1>

			<ProductsSummary products={products} />
		</>
	)
}
