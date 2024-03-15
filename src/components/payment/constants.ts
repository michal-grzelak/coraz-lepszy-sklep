import { z } from "zod"

import { PaymentMethod } from "@models/payment"
import { type SelectItem } from "@ui/select"

export const paymentMethodFormSchema = z.object({
	paymentMethod: z.enum<PaymentMethod, NonEmptyArray<PaymentMethod>>(
		Object.values(PaymentMethod) as NonEmptyArray<PaymentMethod>,
	),
})

export const paymentMethodSelectItems = [
	{ value: PaymentMethod.BANK_TRANSFER, label: PaymentMethod.BANK_TRANSFER },
	{ value: PaymentMethod.CREDIT_CARD, label: PaymentMethod.CREDIT_CARD },
	{ value: PaymentMethod.PAY_LATER, label: PaymentMethod.PAY_LATER },
] as const satisfies SelectItem<PaymentMethod>[]
