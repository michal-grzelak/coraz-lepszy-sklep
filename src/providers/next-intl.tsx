import { NextIntlClientProvider, useMessages } from "next-intl"
import { type ReactNode } from "react"

import { i18nConfig } from "@/i18n"

type Props = { children: ReactNode }

export const NextIntlProvider = ({ children }: Props) => {
	const messages = useMessages()

	return (
		<NextIntlClientProvider locale={"en"} messages={messages} formats={i18nConfig.formats}>
			{children}
		</NextIntlClientProvider>
	)
}
