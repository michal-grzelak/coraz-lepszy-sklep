import { get, groupBy } from "lodash"
import { type ZodIssue } from "zod"

import { type ValidationError } from "@types"

export const mapZodErrorToValidationError = (
	issues: ZodIssue[],
	value: Record<string, unknown>,
): ValidationError[] => {
	const validationErrors: ValidationError[] = []
	const rootMessages: string[] = []

	// group errors by field path
	const errorsWithMappedPath = issues.map((issue) => ({
		...issue,
		path: issue.path.join("."),
	}))
	const errorsGrouped = groupBy(errorsWithMappedPath, (error) => error.path)

	// process all zod errors into validation errors
	for (const path in errorsGrouped) {
		const errors = errorsGrouped[path]
		// merge all error messages into one string for field path
		const message = errors.map((error) => error.message).join(", ")

		const propertyValue = get(value, path)
		// if property exists, add validation error
		if (!!propertyValue && typeof propertyValue !== "object") {
			validationErrors.push({
				path,
				message: message,
				code: errors[0].code,
				fatal: !!errors[0].fatal,
			})
		} else {
			// else add root message
			rootMessages.push(message)
		}
	}

	// merge all root messages into one string
	if (rootMessages.length) {
		const rootErrorMessage = rootMessages.join(", ")
		validationErrors.push({
			path: "root",
			code: "custom",
			message: rootErrorMessage,
			fatal: true,
		})
	}

	return validationErrors
}
