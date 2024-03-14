"use client"

import clsx from "clsx"
import { type ReactNode, type ComponentProps, cloneElement } from "react"

import {
	FormItem as BaseFormItem,
	FormControl,
	FormDescription,
	type FormField,
	FormLabel,
	FormMessage,
} from "@base-ui/form"

export type FormItemProps = {
	label: ReactNode
	description?: ReactNode
	children: JSX.Element
	className?: string
	isSingleline?: boolean
}

export const FormItem = ({
	children,
	label,
	description,
	className,
	isSingleline, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FormItemProps): ComponentProps<typeof FormField<any, any>>["render"] => {
	// eslint-disable-next-line react/display-name
	return ({ field }) => (
		<BaseFormItem className={clsx(className, { "flex space-x-small space-y-0": isSingleline })}>
			<FormLabel>{label}</FormLabel>
			<FormControl>{cloneElement(children, field)}</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</BaseFormItem>
	)
}
