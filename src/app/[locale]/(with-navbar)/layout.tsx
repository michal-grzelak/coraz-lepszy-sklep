import { type ReactNode } from "react"

import { Navbar } from "@components/Navbar"

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />

			<main className="container mt-normal flex flex-col gap-normal">{children}</main>
		</>
	)
}
