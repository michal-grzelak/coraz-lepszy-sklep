import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { type ShippingMethod } from "@models/shipping"

type Props = { shippingMethod?: ShippingMethod }

export const ShippingMethodSummary = ({ shippingMethod }: Props) => {
	const t = useTranslations()

	return (
		<section className="grid grid-flow-row grid-cols-4 gap-normal">
			<h2 className="col-span-1">{t(`routes.${ROUTES.SHIPPING_METHOD}`)}:</h2>
			<p>{shippingMethod ?? t("domain.shipping.shippingMethod.skipped")}</p>
		</section>
	)
}
