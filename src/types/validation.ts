import { type ZodIssue } from "zod"

export interface ValidationError {
	path: string
	message: string
	code: ZodIssue["code"]
	fatal: boolean
}
