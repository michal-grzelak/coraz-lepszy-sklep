import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { type PaymentMethod } from "@models/payment"

type Props = { paymentMethod?: PaymentMethod }

export const PaymentMethodSummary = ({ paymentMethod }: Props) => {
	const t = useTranslations()

	return (
		<section className="flex flex-row gap-normal">
			<h2>{t(`routes.${ROUTES.PAYMENT_METHOD}`)}:</h2>
			<p>{paymentMethod ?? t("domain.payment.paymentMethod.skipped")}</p>
		</section>
	)
}
