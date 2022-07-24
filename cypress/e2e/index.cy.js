describe('Home Route', () => {
    beforeEach(() => {
        cy.visit("/")

        // login
        cy.intercept("POST", "/api/v1/login", {
            user: {
                id: 1, 
                name: "kelvin",
                city: null,
                address: null,
                phone: null,
            },
            token: "token",
        }).as("login")
    })

    it('should render home page with empty search and all category', () => {
        // check url
        cy.url().should('include', '/?search=&category=')

        // mocking api
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

        cy.intercept("GET", "/api/v1/notification*", [
            {
                id: 1,
                user_id: 1,
                title: "Penawaran terkirim",
                message: null,
                read: false,
                createdAt: new Date(),
                products: {
                    product_id: 1,
                    name: "Product 1",
                    price: 500000
                },
                bids: {
                    user_id: 1,
                    request_price: 100000,
                    status: "pending"
                },
                images: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
            },
            {
                id: 2,
                user_id: 1,
                title: "Produk ditawar",
                message: null,
                read: false,
                createdAt: new Date(),
                products: {
                    product_id: 1,
                    name: "Product 1",
                    price: 500000
                },
                bids: {
                    user_id: 5,
                    request_price: 100000,
                    status: "pending"
                },
                images: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
            },
        ]).as("getNotification")

        // wait for api response
        cy.wait('@getCategories')
        cy.wait('@getProducts')

        // check masuk button
        cy.get("#Masuk").should('exist')

        // login
        cy.get("#Masuk").click()
        
        // check url login
        cy.url().should('include', '/login')

        // insert credential
        cy.get("#Email").type("kelvin@gmail.com")
        cy.get("#Password").type("kelvin123").type("{enter}")

        // waiting for mock api
        cy.wait('@login')

        // redirect to home page
        cy.url().should('include', '/?search=&category=')

        cy.wait('@getCategories')
        cy.wait('@getProducts')
        cy.wait("@getNotification")

        // test to search by input in navbar
        cy.get("#Search").type("product").type("{enter}")

        // redirect to home page
        cy.url().should('include', '/?search=product&category=')

        // test to search by category
        cy.get("#Kesehatan").click()

        // redirect to home page
        cy.url().should('include', '/?search=product&category=Kesehatan')


        // check in mobile phone
        cy.viewport(420, 360)

        // click user profile slider
        cy.get("#toggle-navbar").click()
        cy.get("#user-profile-navbar").click()

        // check user profile slider
        cy.get("#Account-slider").should("be.visible")
        cy.get("#close-button-user-profile-navbar").click()
        cy.get("#Account-slider").should("not.be.visible")

        // check notification slider
        cy.get("#toggle-navbar").click()
        cy.get("#notification-navbar").click()

        // check notification slider
        cy.get("#Notifications-slider").should("be.visible")
        cy.get("#close-button-notification-navbar").click()
        cy.get("#Notifications-slider").should("not.be.visible")
    })
    
    it('should redirect to 500 page', () => {
        // check url
        cy.url().should('include', '/?search=&category=')


        // mocking api
        cy.intercept("GET", "/api/v1/categories", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("getCategories")

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

        cy.intercept("GET", "/api/v1/notification*", [
            {
                id: 1,
                user_id: 1,
                title: "Penawaran Terkirim",
                message: null,
                read: false,
                createdAt: new Date(),
                products: {
                    product_id: 1,
                    name: "Product 1",
                    price: 500000
                },
                bids: {
                    user_id: 1,
                    request_price: 100000,
                    status: "pending"
                },
                images: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
            }
        ]).as("getNotification")

        // wait for api response
        cy.wait('@getCategories')
        cy.wait('@getProducts')

        // assert window url 500 page
        cy.url().should('include', '/500')
    })
})