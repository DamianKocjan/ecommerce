import {
	ComponentPropsWithoutRef,
	ElementType,
	PropsWithChildren,
} from "react";

type PolymorphicAsProp<E extends ElementType> = {
	as?: E;
};

export type PolymorphicProps<E extends ElementType> = PropsWithChildren<
	ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>;

export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
