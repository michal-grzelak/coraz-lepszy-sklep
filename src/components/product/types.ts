import { type ProductDTO } from "@models/product"

export type TAddProduct = Omit<ProductDTO, "id">
