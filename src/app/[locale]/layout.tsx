import { Inter } from "next/font/google"
import { NextIntlClientProvider, useMessages } from "next-intl"

import { i18nConfig } from "@/i18n"

import type { Metadata } from "next"

import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Coraz Lepszy Sklep",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const messages = useMessages()

	return (
		<html lang="en">
			<body
				className={`${inter.className} min-h-screen sm:!px-page-sm md:!px-page-md lg:!px-page-lg`}
			>
				<NextIntlClientProvider locale={"en"} messages={messages} formats={i18nConfig.formats}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
