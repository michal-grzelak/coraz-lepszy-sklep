"use client"

import { isFunction } from "lodash"
import { useTranslations } from "next-intl"
import { type ReactNode, useId, forwardRef, type ForwardedRef } from "react"

import {
	Select as BaseSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@base-ui/select"

type Label = ReactNode | ((t: ReturnType<typeof useTranslations>) => ReactNode)

export type SelectItem<T = string> = {
	value: T
	label: Label
}
export type SelectGroup<T = string> = { label: Label; items: SelectItem<T>[] }

type Props<T = string> = {
	placeholder: ReactNode
	items: SelectItem<T>[] | SelectGroup<T>[]
	disabled?: boolean
	onSelect?: (value: T) => void
	value?: T
	defaultValue?: T
	name?: string
	className?: string
}

const _Select = <T,>(
	{
		placeholder,
		items,
		disabled,
		value,
		defaultValue,
		onSelect: _onSelect,
		name,
		className,
	}: Props<T>,
	_ref: ForwardedRef<Partial<HTMLSelectElement>>,
) => {
	const id = useId()
	const t = useTranslations()

	const onSelect = (value: string) => {
		const parsedValue = JSON.parse(value) as T

		_onSelect!(parsedValue)
	}

	return (
		<BaseSelect
			disabled={disabled}
			onValueChange={_onSelect ? onSelect : undefined}
			value={value ? JSON.stringify(value) : undefined}
			defaultValue={defaultValue ? JSON.stringify(defaultValue) : undefined}
			name={name}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item, index) => {
					if ("items" in item) {
						return (
							<SelectGroup key={`select-group-${index}-${id}`}>
								<SelectLabel>{isFunction(item.label) ? item.label(t) : item.label}</SelectLabel>
								{item.items.map((item, index) => (
									<SelectItem key={`select-item-${index}-${id}`} value={JSON.stringify(item.value)}>
										{isFunction(item.label) ? item.label(t) : item.label}
									</SelectItem>
								))}
							</SelectGroup>
						)
					} else {
						return (
							<SelectItem key={`select-item-${index}-${id}`} value={JSON.stringify(item.value)}>
								{isFunction(item.label) ? item.label(t) : item.label}
							</SelectItem>
						)
					}
				})}
			</SelectContent>
		</BaseSelect>
	)
}

export const Select = forwardRef(_Select)
