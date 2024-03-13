import createMiddleware from "next-intl/middleware"

import { LOCALES } from "./constants"

// eslint-disable-next-line import/no-default-export
export default createMiddleware({
	// A list of all locales that are supported
	locales: LOCALES,

	// Used when no locale matches
	defaultLocale: LOCALES[0],
	localePrefix: "never",
})

export const config = {
	// Skip all paths that should not be internationalized.
	// This skips the folders "api", "_next" and all files
	// with an extension (e.g. favicon.ico)
	matcher: ["/((?!api|_next|.*\\..*).*)"],
}
