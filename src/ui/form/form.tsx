"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode } from "react"
import { type Path, useForm, type DefaultValues } from "react-hook-form"
import { type z, type ZodSchema } from "zod"

import { FormProvider } from "@base-ui/form"
import { cn } from "@lib/cn"
import { type ValidationError } from "@types"
import { Button } from "@ui/button"

import { RootFormMessage } from "./root-form-message"

type Props<T extends ZodSchema<any, any>> = {
	schema: T
	defaultValues: DefaultValues<z.infer<T>>
	onSubmit: (
		value: z.infer<T>,
	) => Promise<void | { errors: ValidationError[] }> | (void | { errors: ValidationError[] })
	children: ReactNode
	submitText?: string
	className?: string
}

export const Form = <T extends ZodSchema<any, any>>({
	schema,
	defaultValues,
	onSubmit,
	children,
	submitText = "Submit",
	className,
}: Props<T>): JSX.Element => {
	const form = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: "onTouched",
	})

	const _onSubmit = async (value: z.infer<T>) => {
		const result = await onSubmit(value)

		if (!!result && Array.isArray(result.errors)) {
			result.errors.forEach((error) => {
				form.setError(error.path as Path<z.infer<T>>, {
					type: "server",
					message: error.message,
				})
			})
		} else {
			form.reset()
		}
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(_onSubmit)}
				className={cn("grid grid-flow-row gap-normal", className)}
			>
				{children}
				<RootFormMessage />
				<Button
					loading={form.formState.isSubmitting}
					disabled={!form.formState.isValid}
					aria-disabled={!form.formState.isValid}
					className="col-span-full !mt-8"
				>
					{submitText}
				</Button>
			</form>
		</FormProvider>
	)
}
