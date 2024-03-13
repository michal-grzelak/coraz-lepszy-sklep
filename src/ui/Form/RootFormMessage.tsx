"use client"

import { useId } from "react"

import { FormFieldContext, FormItemContext, FormMessage } from "@base-ui/form"

const ROOT_NAME = "root"

export const RootFormMessage = () => {
	const id = useId()

	return (
		<FormFieldContext.Provider value={{ name: ROOT_NAME }}>
			<FormItemContext.Provider value={{ id }}>
				<FormMessage />
			</FormItemContext.Provider>
		</FormFieldContext.Provider>
	)
}
