import "@testing-library/jest-dom/vitest";

// `toSorted` polyfill
Array.prototype.toSorted = function () {
	const arr = [...this];
	arr.sort((a, b) => a - b);
	return arr;
};
