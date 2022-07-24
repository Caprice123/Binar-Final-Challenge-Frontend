describe("Register route", () => {
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


    // ERROR TEST CASE
    it('should show alert popup', () => {
        const NewUser = {
            name: "kelvin  cen",
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
        
        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);
        
        // assert window alert no name
        cy.get("#Nama").type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Tolong isi nama');
        })
        
        // assert window alert no email
        cy.get("#Nama").type(NewUser.name)
        cy.get("#Nama").type("{enter}").then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Tolong isi email');
        })

        // assert window alert wrong email format
        cy.get("#Email").type("kelvin@")
        cy.get("#Email").type("{enter}").then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Invalid email format');
        })

        // inserting correct email format
        cy.get("#Email").clear()
        cy.get("#Email").type(NewUser.email)

        // assert window alert no password
        cy.get("#Email").type("{enter}").then(() => {
            expect(stub.getCall(3)).to.be.calledWith('Tolong isi password');
        })
        
        // submitting password
        cy.get("#Password").type(NewUser.password).type("{enter}")

        // waiting for mock api response
        cy.wait('@register')

        // assert url redirect to login
        cy.url().should('include', '/login')
    })


    it('should show error popup because of duplicate email', () => {
        const NewUser = {
            name: "kelvin",
            email: "kelvin@gmail.com",
            password: "kelvin123",
        }

        const expectedError = {
            self: "Error",
            statusCode: 409,
            message: "User Already Exist"
        }

        cy.intercept("POST", "/api/v1/register", {
            statusCode: 409,
            body: expectedError
        }).as("register")

        cy.get("#Nama").type(NewUser.name)
        cy.get("#Email").type(NewUser.email)
        cy.get("#Password").type(NewUser.password).type("{enter}")

        cy.wait('@register')

        cy.get("#error-message").should("be.visible").contains(expectedError.message)
    })

    it('should redirect to 500 page', () => {
        const NewUser = {
            name: "kelvin",
            email: "kelvin@gmail.com",
            password: "kelvin123",
        }

        const expectedError = {
            self: "Error",
            statusCode: 500,
            message: "Internal Server Error"
        }

        cy.intercept("POST", "/api/v1/register", {
            statusCode: 500,
            body: expectedError
        }).as("register")

        cy.get("#Nama").type(NewUser.name)
        cy.get("#Email").type(NewUser.email)
        cy.get("#Password").type(NewUser.password).type("{enter}")

        cy.wait('@register')

        cy.url().should('include', '/500')
    })
})
