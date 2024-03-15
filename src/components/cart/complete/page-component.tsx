"use client"

import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

export const CompletePageComponent = () => {
	const t = useTranslations()

	return (
		<section className="flex flex-grow items-center justify-center">
			<h1 className="text-5xl font-bold">{t(`routes.${ROUTES.COMPLETE}.title`)}</h1>
		</section>
	)
}
