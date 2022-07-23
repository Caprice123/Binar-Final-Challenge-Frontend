
describe("Login route", () => {
    beforeEach(() => {
        cy.visit("/logout")
    })

    // SUCCESS TEST CASE
    it("should redirect to login route", () => {
        cy.url().should('include', '/login')
    })

})
