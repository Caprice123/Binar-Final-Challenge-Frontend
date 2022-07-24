describe("Product Daftar Jual Route", () => {
    beforeEach(() => {
        // logging in user
        cy.visit("/login")

        // mocking api login and home
        cy.intercept("POST", "/api/v1/login", {
            user: {
                id: 1, 
                name: "kelvin",
                city: "Jakarta",
                address: "Sebelah rumah tetangga",
                phone: "0123456789",
            },
            token: "token",
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
        // visiting daftar-jual
        cy.visit("/daftar-jual")
        
        // waiting for default mock api
        cy.wait("@getCurrentUser")
        cy.wait("@getNotification")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products?user_id=1", [
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
        ]).as("getProductsDaftarJual")

        // waiting mock api
        cy.wait("@getProductsDaftarJual")

        // checking card to exist
        cy.get("#product-1").should("be.exist")

        // test to search by input in navbar
        cy.get("#Search").type("product").type("{enter}")

        // redirect to home page
        cy.url().should('include', '/?search=product&category=')
    })

    it("should redirect to wishlist route", () => {
       // visiting daftar-jual
       cy.visit("/daftar-jual")
        
       // waiting for default mock api
       cy.wait("@getCurrentUser")
       cy.wait("@getNotification")
       
       // mocking needed api
       cy.intercept("GET", "/api/v1/products?user_id=1", [
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
        ]).as("getProductsDaftarJual")

        // waiting mock api
        cy.wait("@getProductsDaftarJual")

        // checking card to exist
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

        // clicking wishlist button
        cy.get("#wishlist-button").scrollIntoView().click()

        // assert redirect to wishlist
        cy.url().should('include', '/daftar-jual/wishlist')
    })

    it("should redirect to sold route", () => {
        // visiting daftar-jual
        cy.visit("/daftar-jual")
        
        // waiting for default mock api
        cy.wait("@getCurrentUser")
        cy.wait("@getNotification")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products?user_id=1", [
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
        ]).as("getProductsDaftarJual")

        // waiting mock api
        cy.wait("@getProductsDaftarJual")

        // checking card to exist
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

        // asssert redirect to sold page
        cy.url().should('include', '/daftar-jual/sold')
    })


    it("should redirect to 500 page due to internal server error when getting all products", () => {
        // visiting daftar jual
        cy.visit("/daftar-jual")
        
        // waiting for default api
        cy.wait("@getCurrentUser")
        cy.wait("@getNotification")
        
        // mocking needed api
        cy.intercept("GET", "/api/v1/products?user_id=1", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("getProductsDaftarJual")

        // waiting for mock api resposne
        cy.wait("@getProductsDaftarJual")

        // assert redirect to 500
        cy.url().should('include', '/500')
    })
})