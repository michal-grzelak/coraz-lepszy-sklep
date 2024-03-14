export interface Address {
	street: string
	city: string
	country: Country
}

export enum Country {
	POLAND = "POLAND",
	USA = "USA",
}
