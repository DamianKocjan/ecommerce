import {
	cleanUpObject,
	combineObjects,
	deepCompare,
	isNothing,
	isNumber,
	stringifyValue,
	tryToNumber,
	type Arrayish,
	type AsyncReturnType,
	type Maybe,
	type MaybePromise,
} from "./primitives";

describe("primitives", () => {
	describe("isNumber", () => {
		it("should return true for numbers", () => {
			expect(isNumber("1")).toBe(true);
			expect(isNumber("1.1")).toBe(true);
			expect(isNumber("0")).toBe(true);
			expect(isNumber(".1")).toBe(true);
			expect(isNumber("0.1")).toBe(true);
			expect(isNumber("-1")).toBe(true);
			expect(isNumber("-1.1")).toBe(true);
		});

		it("should return false for non-numbers", () => {
			expect(isNumber("")).toBe(false);
			expect(isNumber("a")).toBe(false);
			expect(isNumber("1a")).toBe(false);
			expect(isNumber("a1")).toBe(false);
			expect(isNumber("1.1.1")).toBe(false);
			expect(isNumber("1.1.")).toBe(false);
		});
	});

	describe("tryToNumber", () => {
		it("should return numbers for numbers", () => {
			expect(tryToNumber("1")).toBe(1);
			expect(tryToNumber("1.1")).toBe(1.1);
			expect(tryToNumber("0")).toBe(0);
			expect(tryToNumber(".1")).toBe(0.1);
			expect(tryToNumber("0.1")).toBe(0.1);
			expect(tryToNumber("-1")).toBe(-1);
			expect(tryToNumber("-1.1")).toBe(-1.1);
		});

		it("should return strings for non-numbers", () => {
			expect(tryToNumber("")).toBe("");
			expect(tryToNumber("a")).toBe("a");
			expect(tryToNumber("1a")).toBe("1a");
			expect(tryToNumber("a1")).toBe("a1");
			expect(tryToNumber("1.1.1")).toBe("1.1.1");
			expect(tryToNumber("1.1.")).toBe("1.1.");
		});
	});

	describe("stringifyValue", () => {
		it("should return stringified values", () => {
			expect(stringifyValue(1)).toBe("1");
			expect(stringifyValue("a")).toBe("a");
			expect(stringifyValue([1, 2])).toBe("[1,2]");
			expect(stringifyValue([2, 1])).toBe("[1,2]");
		});
	});

	describe("isNothing", () => {
		it("should return true for nothing", () => {
			expect(isNothing(null)).toBe(true);
			expect(isNothing(undefined)).toBe(true);
			expect(isNothing([])).toBe(true);
			expect(isNothing("")).toBe(true);
		});

		it("should return false for something", () => {
			expect(isNothing(0)).toBe(false);
			expect(isNothing({})).toBe(false);
			expect(isNothing([0])).toBe(false);
		});
	});

	describe("deepCompare", () => {
		it("should return true for deeply equal objects", () => {
			expect(deepCompare(1, 1)).toBe(true);
			expect(deepCompare("a", "a")).toBe(true);
			expect(deepCompare([1, "a"], [1, "a"])).toBe(true);
			expect(deepCompare({ a: 1, b: "a" }, { a: 1, b: "a" })).toBe(true);
		});

		it("should return false for deeply unequal objects", () => {
			expect(deepCompare(1, 2)).toBe(false);
			expect(deepCompare("a", "b")).toBe(false);
			expect(deepCompare([1, "a"], [1, "b"])).toBe(false);
			expect(deepCompare({ a: 1, b: "a" }, { a: 1, b: "b" })).toBe(false);
		});
	});

	describe("combineObjects", () => {
		it("should combine objects", () => {
			expect(
				combineObjects({ a: [1, 2], b: "a" }, { a: [2, 3], c: "b" }),
			).toEqual({
				a: [1, 2, 3],
				b: "a",
				c: "b",
			});
		});
	});

	describe("cleanUpObject", () => {
		it("should remove empty values", () => {
			expect(
				cleanUpObject({
					a: [1, 2],
					b: "a",
					c: [],
					d: undefined,
					e: "",
				}),
			).toEqual({
				a: [1, 2],
				b: "a",
			});
		});
	});

	describe("AsyncReturnType", () => {
		it("should return the return type of a promise", () => {
			type Test = () => Promise<number>;
			expectTypeOf<AsyncReturnType<Test>>().toEqualTypeOf<number>();
		});
	});

	describe("Arrayish", () => {
		it("should allow arrays and array-like objects", () => {
			type Test = Arrayish<number>;
			assertType<Test>([1, 2]);
			assertType<Test>(1);
			expectTypeOf<Test>().toEqualTypeOf<number | number[]>();
		});
	});

	describe("Maybe", () => {
		it("should allow nullable types", () => {
			type Test = Maybe<number>;
			assertType<Test>(1);
			assertType<Test>(null);
			expectTypeOf<Test>().toEqualTypeOf<number | null | undefined>();
		});
	});

	describe("MaybePromise", () => {
		it("should allow promises and non-promises", () => {
			type Test = MaybePromise<number>;
			assertType<Test>(1);
			assertType<Test>(Promise.resolve(1));
			expectTypeOf<Test>().toEqualTypeOf<number | Promise<number>>();
		});
	});
});
