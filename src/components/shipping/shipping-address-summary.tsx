import { useTranslations } from "next-intl"

import { ROUTES } from "@/routes"

import { type Address } from "@models/address"

type Props = { address: Address }

export const ShippingAddressSummary = ({ address }: Props) => {
	const t = useTranslations()

	return (
		<section className="grid grid-flow-row grid-cols-4 gap-normal">
			<h2 className="col-span-1">{t(`routes.${ROUTES.SHIPPING_ADDRESS}`)}:</h2>
			{address ? (
				<div className="flex flex-col">
					<div className="flex flex-row items-center gap-small">
						<p>{t("domain.address.country.label")}:</p>
						<p>{address.country}</p>
					</div>

					<div className="flex flex-row items-center gap-small">
						<p>{t("domain.address.city.label")}:</p>
						<p>{address.city}</p>
					</div>

					<div className="flex flex-row items-center gap-small">
						<p>{t("domain.address.street.label")}:</p>
						<p>{address.street}</p>
					</div>
				</div>
			) : (
				<p>{t("domain.address.empty")}</p>
			)}
		</section>
	)
}
