"use client"

import { useFormContext } from "react-hook-form"

import { FormField as BaseFormField } from "@base-ui/form"

import { type FormItemProps, FormItem } from "./FormItem"

type Props = { name: string } & FormItemProps

export const FormField = ({ name, ...formItemProps }: Props): JSX.Element => {
	const { control } = useFormContext()

	return <BaseFormField control={control} name={name} render={FormItem(formItemProps)} />
}
