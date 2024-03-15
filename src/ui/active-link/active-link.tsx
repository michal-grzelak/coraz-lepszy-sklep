"use client"

import clsx from "clsx"
import { type Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

import { type ButtonProps } from "@ui/button"

type Props<T extends string> = {
	href: Route<T>
	children: ReactNode
	exact?: boolean
	button?: ButtonProps["variant"]
	disabled?: boolean
	className?: string
}

export const ActiveLink = <T extends string>({
	href,
	children,
	exact = true,
	disabled,
	className,
}: Props<T>) => {
	const pathname = usePathname()
	const isActive = exact ? href === pathname : pathname.startsWith(href)

	return (
		<Link
			href={href}
			className={clsx(
				"flex gap-small text-accent hover:font-bold",
				{
					"border-b-normal border-current text-accent-foreground": isActive,
					"pointer-events-none cursor-not-allowed": disabled,
				},
				className,
			)}
			aria-current={isActive ? true : undefined}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : undefined}
		>
			{children}
		</Link>
	)
}
