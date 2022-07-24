describe("Product Bid Route", () => {
    beforeEach(() => {
        // logging in user
        cy.visit("/login")

        // mocking login and home page
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
        ]).as("getProducts")

        cy.intercept("GET", "/api/v1/notification*", []).as("getNotification")
        cy.intercept("PUT", "/api/v1/profil", "Successfully updated profile").as("updateProfile")

        cy.intercept("PUT", "/api/v1/products/*", {
            user_id: 1,
            category_id: 1,
            name: "Product 2",
            price: 500000,
            description: "TESTING DESKRIPSI",
        }).as("updateProduct")

        cy.intercept("POST", "/api/v1/productsimageupload", {
            user_id: 1,
            category_id: 1,
            name: "Product 2",
            price: 500000,
            description: "TESTING DESKRIPSI",
        }).as("productsimageupload")

        // insert credentials
        cy.get("#Email").type("kelvin@gmail.com")
        cy.get("#Password").type("kelvin123").type("{enter}")

        // waiting for mock api
        cy.wait('@login')

        // redirect to home page
        cy.url().should('include', '/?search=&category=')

        // waiting for mock api response
        cy.wait('@getCategories')
        cy.wait('@getProducts')
        cy.wait("@getNotification")
    })
    
    it("should reject product", () => {
        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        }).as("getCurrentUser")

        cy.intercept("GET", "/api/v1/products/1/bids", {
            id: 1,
            name: "anime",
            price: 500000,
            description: "asdas",
            status: "open_for_bid",
            category: {
                id: 1,
                name: "Hobi"
            },
            bids: [
                {
                    id: 1,
                    request_price: 100000,
                    status: "pending",
                    user: {
                        id: 2,
                        name: "user 2",
                        city: null,
                        address: null,
                        phone: "0812345670",
                        image: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                }
            ],
            images: [
                {
                    id: 1,
                    name: "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                }
            ]
        }).as("getProductBidByID")

        cy.intercept("PUT", "/api/v1/bids/*", "Successfully reject bid").as("rejectBid")

        // visiting product bid
        cy.visit("/product/1/bid")
        cy.url().should('include', '/product/1/bid')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductBidByID")

        // clicking tolak confirmation button
        cy.get("#Tolak").click()

        // clicking no tolak button
        cy.get("#No-reject").click()

        // clicking tolak confimation button
        cy.get("#Tolak").click()

        // clicking yes tolak button
        cy.get("#Yes-reject").click()

        // waiting for mock api response
        cy.wait("@rejectBid")

        // asserting flahs messsage
        cy.get("#flash-message").contains("Successfully reject bid")
    })

    it("should accept product", () => {
        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        }).as("getCurrentUser")

        cy.intercept("GET", "/api/v1/products/1/bids", {
            id: 1,
            name: "anime",
            price: 500000,
            description: "asdas",
            status: "open_for_bid",
            category: {
                id: 1,
                name: "Hobi"
            },
            bids: [
                {
                    id: 1,
                    request_price: 100000,
                    status: "pending",
                    user: {
                        id: 2,
                        name: "user 2",
                        city: null,
                        address: null,
                        phone: "0812345670",
                        image: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                }
            ],
            images: [
                {
                    id: 1,
                    name: "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                }
            ]
        }).as("getProductBidByID")

        cy.intercept("PUT", "/api/v1/bids/*", "Successfully accept bid").as("acceptBid")

        // visiting product bid
        cy.visit("/product/1/bid")
        cy.url().should('include', '/product/1/bid')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductBidByID")

        // clicking terima confirmation button
        cy.get("#Terima").click()
        cy.get("#Yes-accept").click()

        // waiting for mock api response
        cy.wait("@acceptBid")

        // asserting flahs messsage
        cy.get("#flash-message").contains("Successfully accept bid")
    })


    it("should reject from waiting_for_negotiation", () => {
        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        }).as("getCurrentUser")

        cy.intercept("GET", "/api/v1/products/1/bids", {
            id: 1,
            name: "anime",
            price: 500000,
            description: "asdas",
            status: "open_for_bid",
            category: {
                id: 1,
                name: "Hobi"
            },
            bids: [
                {
                    id: 1,
                    request_price: 100000,
                    status: "waiting_for_negotiation",
                    user: {
                        id: 2,
                        name: "user 2",
                        city: null,
                        address: null,
                        phone: "0812345670",
                        image: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                }
            ],
            images: [
                {
                    id: 1,
                    name: "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                }
            ]
        }).as("getProductBidByID")

        cy.intercept("PUT", "/api/v1/bids/*", "Successfully reject bid").as("rejectTransactionBid")

        // visiting product bid
        cy.visit("/product/1/bid")
        cy.url().should('include', '/product/1/bid')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductBidByID")

        // clicking reject status button
        cy.get("#Status").click()
        cy.get("#flexRadioDefault2").click()
        cy.get("#update-status-button").click()

        // waiting for mock api response
        cy.wait("@rejectTransactionBid")

        // asserting flahs messsage
        cy.get("#flash-message").contains("Successfully reject bid")
    })
    it("should done transaction from waiting_for_negotiation", () => {
        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        }).as("getCurrentUser")

        cy.intercept("GET", "/api/v1/products/1/bids", {
            id: 1,
            name: "anime",
            price: 500000,
            description: "asdas",
            status: "open_for_bid",
            category: {
                id: 1,
                name: "Hobi"
            },
            bids: [
                {
                    id: 1,
                    request_price: 100000,
                    status: "waiting_for_negotiation",
                    user: {
                        id: 2,
                        name: "user 2",
                        city: null,
                        address: null,
                        phone: "0812345670",
                        image: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg"
                    }
                }
            ],
            images: [
                {
                    id: 1,
                    name: "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                }
            ]
        }).as("getProductBidByID")

        cy.intercept("PUT", "/api/v1/bids/*", "Successfully done transaction").as("acceptTransactionBid")

        // visiting product bid
        cy.visit("/product/1/bid")
        cy.url().should('include', '/product/1/bid')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductBidByID")

        // clicking berhasil terjual status button
        cy.get("#Status").click()
        cy.get("#flexRadioDefault1").click()
        cy.get("#update-status-button").click()

        // waiting for mock api response
        cy.wait("@acceptTransactionBid")

        // asserting flahs messsage
        cy.get("#flash-message").contains("Successfully done transaction")
    })
})