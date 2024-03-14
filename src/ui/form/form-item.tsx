/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import clsx from "clsx"
import { type ReactNode, type ComponentProps, cloneElement } from "react"
import { type ControllerRenderProps } from "react-hook-form"

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
	type?: "default" | "checkbox"
}

// map react-hook-form value to different input types
const mapFieldToInputProps = (
	{ value, onChange, ...field }: ControllerRenderProps<any, any>,
	type: FormItemProps["type"],
) => {
	switch (type) {
		case "checkbox":
			return { ...field, checked: !!value, onCheckedChange: onChange }
		case "default":
		default:
			return { ...field, value, onChange }
	}
}

export const FormItem = ({
	children,
	label,
	description,
	className,
	isSingleline,
	type = "default",
}: FormItemProps): ComponentProps<typeof FormField<any, any>>["render"] => {
	// eslint-disable-next-line react/display-name
	return ({ field }) => (
		<BaseFormItem className={clsx(className, { "flex space-x-small space-y-0": isSingleline })}>
			<FormLabel>{label}</FormLabel>
			<FormControl>{cloneElement(children, mapFieldToInputProps(field, type))}</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</BaseFormItem>
	)
}
