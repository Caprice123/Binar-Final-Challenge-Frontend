import jwt from 'jsonwebtoken'

describe("Login route", () => {
    beforeEach(() => {
        cy.visit("/login")
    })

    // SUCCESS TEST CASE
    it("should visit login route", () => {
        const LoggedInUser = {
            id: 1, 
            name: "kelvin",
            city: null,
            address: null,
            phone: null,
        }
        const LoggedInUserEmail = "kelvin@gmail.com"
        const LoggedInUserPassword = "kelvin123"
        const token = jwt.sign(LoggedInUser, "s3cr3t")

        // mocking api
        cy.intercept("POST", "/api/v1/login", {
            user: LoggedInUser,
            token,
        }).as("login")

        // input credential
        cy.get("#Email").type(LoggedInUserEmail)
        cy.get("#Password").type(LoggedInUserPassword)

        // check for eye icon works
        cy.get(".fa-eye").click()
        cy.get("#Password").should("have.attr", "type", "text")
        cy.get(".fa-eye-slash").click()
        cy.get("#Password").should("have.attr", "type", "password")
        
        // submitting
        cy.get("#Password").type("{enter}")

        // waiting for mock api
        cy.wait('@login')

        // redirect to home page
        cy.url().should('include', '/?search=&category=')
    })

    it("should redirect to register route", () => {
        cy.findByText("Daftar disini").click()

        cy.url().should('include', '/register')
    })


    // ERROR TEST CASE
    it("should not logged in", () => {
        const LoggedInUserEmail = "kelvin@gmail.com"
        const LoggedInUserPassword = "wrongpassword"

        cy.intercept("POST", "/api/v1/login", {
            statusCode: 401,
            body: "Email or Password doesn't match"
        }).as("login")

        cy.get("#Email").type(LoggedInUserEmail)
        cy.get("#Password").type(LoggedInUserPassword).type("{enter}")

        cy.wait('@login')

        cy.get("#error-message").should('be.visible').contains("Email or Password doesn't match")
    })
})
