import { z } from "zod"

import { Country } from "@models/address"
import { type SelectItem } from "@ui/select"

export const shippingAddressFormSchema = z.object({
	street: z.string().max(50).min(1),
	city: z.string().max(50).min(1),
	country: z.enum<Country, NonEmptyArray<Country>>(
		Object.values(Country) as NonEmptyArray<Country>,
	),
})

export const countrySelectItems = [
	{ value: Country.POLAND, label: Country.POLAND },
	{ value: Country.USA, label: Country.USA },
] satisfies SelectItem<Country>[]
