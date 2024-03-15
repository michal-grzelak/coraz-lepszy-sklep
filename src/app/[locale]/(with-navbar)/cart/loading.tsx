import { useTranslations } from "next-intl"

export default function Loading() {
	const t = useTranslations()

	return <span className="flex flex-grow items-center justify-center">{t("common.loading")}</span>
}
