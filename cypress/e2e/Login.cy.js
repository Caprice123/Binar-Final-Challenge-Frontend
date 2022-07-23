import jwt from 'jsonwebtoken'

describe("Login route", () => {
    beforeEach(() => {
        cy.visit("/login")
    })

    // SUCCESS TEST CASE
    it("should visit login route and redirect to home page", () => {
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

        cy.intercept("GET", "/api/v1/categories", [
            {
                id: 1,
                name: "Kesehatan"
            }
        ]).as("getCategories")

        cy.intercept("GET", "/api/v1/products*", [
            {
                id: 1,
                name: "product 1",
                price: 250000,
                description: "",
                status: "open_for_bid",
                category: {
                    id: 1,
                    name: "Kesehatan"
                }, 
                owner: {
                    id: 1,
                    name: "Rizky",
                    city: null,
                    address: null,
                    phone: null,
                },
                images: [
                    {
                        id: 1,
                        name: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                ]
            }
        ]).as("getProducts")

        cy.intercept("GET", "/api/v1/notification*", []).as("getNotification")

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

        cy.wait('@getCategories')
        cy.wait('@getProducts')
        cy.wait('@getNotification')
    })

    it("should redirect to register route", () => {
        cy.findByText("Daftar disini").click()

        cy.url().should('include', '/register')
    })


    // ERROR TEST CASE
    it("should render error message because incorrect password", () => {
        const LoggedInUserEmail = "kelvin@gmail.com"
        const LoggedInUserPassword = "wrongpassword"

        // mocking api
        cy.intercept("POST", "/api/v1/login", {
            statusCode: 401,
            body: "Email or Password doesn't match"
        }).as("login")

        // inserting data
        cy.get("#Email").type(LoggedInUserEmail)
        cy.get("#Password").type(LoggedInUserPassword).type("{enter}")

        // calling mock api
        cy.wait('@login')

        // checking error message
        cy.get("#error-message").should('be.visible').contains("Email or Password doesn't match")
    })
})
