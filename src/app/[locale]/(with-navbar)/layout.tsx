import { type ReactNode } from "react"

import { Navbar } from "@components/navbar"

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />

			<main className="container mt-normal flex h-full flex-grow flex-col gap-normal">
				{children}
			</main>
		</>
	)
}
