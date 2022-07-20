import jwt from 'jsonwebtoken'

describe("Login route", () => {
    beforeEach(() => {
        cy.visit("/register")
    })

    // SUCCESS TEST CASE
    it("should visit register route", () => {
        const NewUser = {
            name: "kelvin",
            email: "kelvin@gmail.com",
            password: "kelvin123",
        }

        cy.intercept("POST", "/api/v1/register", {
            id: 1,
            name: NewUser.name,
            email: NewUser.email,
            created_at: new Date(),
            updated_at: new Date(),
            message: `Email kamu berhasil terdaftar`
        }).as("register")

        cy.get("#Nama").type(NewUser.name)
        cy.get("#Email").type(NewUser.email)
        cy.get("#Password").type(NewUser.password).type("{enter}")

        cy.wait('@register')

        cy.url().should('include', '/login')
        cy.get("#flash-message").should("be.visible").contains("Successfully register")
    })
})
