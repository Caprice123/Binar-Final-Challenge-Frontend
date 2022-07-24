describe("Wishlist Daftar Jual Route", () => {
    beforeEach(() => {
        // logging in user
        cy.visit("/login")

        // mocking login and home api
        cy.intercept("POST", "/api/v1/login", {
            user: {
                id: 1, 
                name: "kelvin",
                city: "Jakarta",
                address: "Sebelah rumah tetangga",
                phone: "0123456789",
            },
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJjYXByaWNlQGdtYWlsLmNvbSIsIm5hbWUiOiJjYXByaWNlIiwiY2l0eSI6IkthYnVwYXRlbiBLb3RhIEJhcnUiLCJhZGRyZXNzIjoic2ViZWxhaCBydW1haCB0ZXRhbmdnYSIsInBob25lIjoiMDg5NjE2NDAyNjgiLCJpYXQiOjE2NTg2MDc0MTV9.4r7Ua_RP4i5pR4E3y9LdZhKOqoCjly4JWSSYKwqcSro",
        }).as("login")

        cy.intercept("GET", "/api/v1/categories", [
            {
                id: 1,
                name: "Kesehatan"
            }
        ]).as("getCategories")

        cy.intercept("GET", "/api/v1/products?excludeStatusProduct=sold&excludeUserId=1&search=&category=", [
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
        ]).as("getProductsHome")
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        
        }).as("getCurrentUser")

        cy.intercept("GET", "/api/v1/notification*", []).as("getNotification")

        // insert credentials
        cy.get("#Email").type("kelvin@gmail.com")
        cy.get("#Password").type("kelvin123").type("{enter}")

        // waiting for mock api
        cy.wait('@login')

        // redirect to home page
        cy.url().should('include', '/?search=&category=')

        // waiting for mock api response
        cy.wait('@getCategories')
        cy.wait('@getProductsHome')
        cy.wait("@getNotification")
    })
    
    it('should redirect to home page', () => {
        // visiting wishlist page
        cy.visit("/daftar-jual/wishlist")
        
        // waiting for mock api
        cy.wait("@getCurrentUser")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products/wishlist", [
            {
                id: 1,
                category: {
                    id: 1,
                    name: "Kesehatan"
                },
                name: "product 1",
                price: 250000,
                description: "",
                status: "open_for_bid",
                images: [
                    {
                        id: 1,
                        name: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                ]
            }
        ]).as("getProductsWishlist")

        // waiting for api response
        cy.wait("@getProductsWishlist")

        // assert card to exist
        cy.get("#product-1").should("be.exist")

        // test to search by input in navbar
        cy.get("#Search").type("product").type("{enter}")

        // redirect to home page
        cy.url().should('include', '/?search=product&category=')
    })
    
    it("should render product with bid", () => {
       // visiting wishlist page
       cy.visit("/daftar-jual/wishlist")
        
       // waiting for mock api
       cy.wait("@getCurrentUser")
       
       // mocking needed api
       cy.intercept("GET", "/api/v1/products/wishlist", [
           {
               id: 1,
               category: {
                   id: 1,
                   name: "Kesehatan"
               },
               name: "product 1",
               price: 250000,
               description: "",
               status: "open_for_bid",
               images: [
                   {
                       id: 1,
                       name: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                   }
               ]
           }
       ]).as("getProductsWishlist")

       // waiting for api response
       cy.wait("@getProductsWishlist")

       // assert card to exist
       cy.get("#product-1").should("be.exist")
    })
    it("should redirect to daftar jual route", () => {
        // visiting wishlist page
        cy.visit("/daftar-jual/wishlist")
        
        // waiting for mock api
        cy.wait("@getCurrentUser")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products/wishlist", [
            {
                id: 1,
                category: {
                    id: 1,
                    name: "Kesehatan"
                },
                name: "product 1",
                price: 250000,
                description: "",
                status: "open_for_bid",
                images: [
                    {
                        id: 1,
                        name: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                ]
            }
        ]).as("getProductsWishlist")

        // waiting for api response
        cy.wait("@getProductsWishlist")

        // assert card to exist
        cy.get("#product-1").should("be.exist")

        // check in mobile phone
        cy.viewport(720, 480)

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

        // clicking daftar-jual button
        cy.get("#daftar-jual-button").scrollIntoView().click()

        // assert redirect to daftar jual
        cy.url().should('include', '/daftar-jual')
    })

    it("should redirect to sold route", () => {
        // visiting wishlist page
        cy.visit("/daftar-jual/wishlist")
        
        // waiting for mock api
        cy.wait("@getCurrentUser")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products/wishlist", [
            {
                id: 1,
                category: {
                    id: 1,
                    name: "Kesehatan"
                },
                name: "product 1",
                price: 250000,
                description: "",
                status: "open_for_bid",
                images: [
                    {
                        id: 1,
                        name: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                ]
            }
        ]).as("getProductsWishlist")

        // waiting for api response
        cy.wait("@getProductsWishlist")

        // assert card to exist
        cy.get("#product-1").should("be.exist")

        // check in mobile phone
        cy.viewport(720, 480)

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

        // clicking sold button
        cy.get("#sold-button").scrollIntoView().click()

        // assert rediect to sold page
        cy.url().should('include', '/daftar-jual/sold')
    })


    it("should redirect to 500 page due to internal server error when getting products", () => {
        // visiting wishlist page
        cy.visit("/daftar-jual/wishlist")
        
        // waiting for mock api response
        cy.wait("@getCurrentUser")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products/wishlist", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("getProductsWishlist")

        // waiting for mock api response
        cy.wait("@getProductsWishlist")

        // assert redirect to 500
        cy.url().should('include', '/500')
    })
})