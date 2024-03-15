import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { type PaymentMethod } from "@models/payment"

type Props = { paymentMethod?: PaymentMethod }

export const PaymentMethodSummary = ({ paymentMethod }: Props) => {
	const t = useTranslations()

	return (
		<section className="grid grid-flow-row grid-cols-4 gap-normal">
			<h2 className="col-span-1">{t(`routes.${ROUTES.PAYMENT_METHOD}.title`)}:</h2>
			<p>{paymentMethod ?? t("domain.payment.paymentMethod.skipped")}</p>
		</section>
	)
}
