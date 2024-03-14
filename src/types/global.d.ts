declare type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never

declare type NonEmptyArray<T extends readonly unknown> = [T, ...T[]]
