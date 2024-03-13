import { Inter } from "next/font/google"

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
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen sm:px-page-sm md:px-page-md lg:px-page-lg`}>
				{children}
			</body>
		</html>
	)
}
