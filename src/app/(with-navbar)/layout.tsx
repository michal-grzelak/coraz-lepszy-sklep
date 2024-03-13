import { type ReactNode } from "react"

import { Navbar } from "@components/Navbar"

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />

			<main className="container mt-4 flex flex-col gap-4">{children}</main>
		</>
	)
}
