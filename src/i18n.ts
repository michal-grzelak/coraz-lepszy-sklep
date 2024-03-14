import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"
import { IntlConfig } from "next-intl"

import { LOCALES } from "./constants"

export const i18nConfig: Pick<IntlConfig, "formats"> = {
	formats: {
		number: { currency: { style: "currency", currency: "EUR" } },
	},
}

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!LOCALES.includes(locale as any)) notFound()

	return {
		messages: (await import(`../messages/${locale}.json`)).default,
		...i18nConfig,
	}
})
