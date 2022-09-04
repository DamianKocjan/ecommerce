/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="cypress" />

describe("Navigation", () => {
	beforeEach(() => {
		cy.visit("localhost:3000/");
		cy.viewport("macbook-16");
	});

	it("Navigation", () => {
		cy.location().should((location) => {
			expect(location.pathname).to.eq("/");
		});
	});
});
