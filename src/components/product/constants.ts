import { z } from "zod"

export const addProductToCartFormSchema = z.object({
	name: z.string().max(20),
	price: z.coerce.number().positive(),
	requiresShipping: z.boolean(),
})
