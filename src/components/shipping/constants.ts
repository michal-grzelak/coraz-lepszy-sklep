import { z } from "zod"

import { Country } from "@models/address"
import { ShippingMethod } from "@models/shipping"
import { type SelectItem } from "@ui/select"

export const shippingAddressFormSchema = z.object({
	street: z.string().max(50).min(1),
	city: z.string().max(50).min(1),
	country: z.enum<Country, NonEmptyArray<Country>>(
		Object.values(Country) as NonEmptyArray<Country>,
	),
})

export const shippingMethodFormSchema = z.object({
	shippingMethod: z.enum<ShippingMethod, NonEmptyArray<ShippingMethod>>(
		Object.values(ShippingMethod) as NonEmptyArray<ShippingMethod>,
	),
})

export const countrySelectItems = [
	{ value: Country.POLAND, label: Country.POLAND },
	{ value: Country.USA, label: Country.USA },
] as const satisfies SelectItem<Country>[]

export const getShippingMethodSelectItems = (country?: Country): SelectItem<ShippingMethod>[] => {
	const mapShippingMethodToSelectItem = (shippingMethod: ShippingMethod) => ({
		value: shippingMethod,
		label: shippingMethod,
	})

	switch (country) {
		case Country.POLAND:
			return [ShippingMethod.COURIER, ShippingMethod.SELF_PICKUP].map(mapShippingMethodToSelectItem)
		case Country.USA:
		default:
			return [ShippingMethod.COURIER].map(mapShippingMethodToSelectItem)
	}
}
