describe("Register route", () => {
    beforeEach(() => {
        cy.visit("/register")
    })

    // SUCCESS TEST CASE
    // it("should visit register route", () => {
    //     const NewUser = {
    //         name: "kelvin",
    //         email: "kelvin@gmail.com",
    //         password: "kelvin123",
    //     }

    //     cy.intercept("POST", "/api/v1/register", {
    //         id: 1,
    //         name: NewUser.name,
    //         email: NewUser.email,
    //         created_at: new Date(),
    //         updated_at: new Date(),
    //         message: `Email kamu berhasil terdaftar`
    //     }).as("register")

    //     cy.get("#Nama").type(NewUser.name)
    //     cy.get("#Email").type(NewUser.email)
    //     cy.get("#Password").type(NewUser.password).type("{enter}")

    //     cy.wait('@register')

    //     cy.url().should('include', '/login')
    //     cy.get("#flash-message").should("be.visible").contains("Successfully register")
    // })


    // ERROR TEST CASE
    it('should show alert popup', () => {
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

        cy.get("#Nama").type("{enter}")
        
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Tolong isi nama');
            return true
        });
        
        cy.get("#Nama").type(NewUser.name).type("{enter}")

        cy.on('window:alert', (text) => {
            expect(text).to.equal('Tolong isi email');
        });

        // cy.on('window:alert', (text) => {
        //     expect(text).to.contains('Tolong isi password');
        // });

        cy.get("#Email").type(NewUser.email)
        cy.get("#Password").type(NewUser.password).type("{enter}")

        cy.wait('@register')

        cy.url().should('include', '/login')
    })


    // it('should show error popup because of duplicate email', () => {
    //     const NewUser = {
    //         name: "kelvin",
    //         email: "kelvin@gmail.com",
    //         password: "kelvin123",
    //     }

    //     const expectedError = "User Already Exist"

    //     cy.intercept("POST", "/api/v1/register", {
    //         statusCode: 409,
    //         body: expectedError
    //     }).as("register")

    //     cy.get("#Nama").type(NewUser.name)
    //     cy.get("#Email").type(NewUser.email)
    //     cy.get("#Password").type(NewUser.password).type("{enter}")

    //     cy.wait('@register')

    //     cy.get("#error-message").should("be.visible").contains(expectedError)
    // })
})
