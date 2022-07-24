describe("Product Bid Route", () => {
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
    
    it("should render saya tertarik dan ingin nego product", () => {
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

        cy.intercept("POST", "/api/v1/bids/check", "0").as("checkBids")

        cy.intercept("GET", "/api/v1/products/1",{
            "id": 15,
            "name": "Rubik 3x3",
            "price": 150000,
            "description": "Rubik",
            "status": "open_for_bid",
            "owner": {
                "id": 8,
                "name": "caprice",
                "city": "Kabupaten Kota Baru",
                "image_url": "https://res.cloudinary.com/djann8mt5/image/upload/v1658567948/binar-final-project/users/gzv3ypu8xku9xogz3d7w.jpg"
            },
            "category": {
                "id": 1,
                "name": "Hobi"
            },
            "images": [
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/qn0c7yebsoyetlys7rcf.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/yq3ly29ae3p3cdzmjll1.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/vgrzv157zvuusjqu8lu3.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/w8piacyrw0vjeboy3oyy.jpg"
            ]
        }).as("getProductOneByID")

        cy.intercept("POST", "/api/v1/products/*/bids", {
            product_id: 1,
            user_id: 8,
            request_price: 150000,
            status: "pending"
        }).as("createBid")

        // visiting product/1
        cy.visit("/product/1")
        cy.url().should('include', '/product/1')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductOneByID")
        cy.wait("@checkBids")

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
        
        cy.viewport(1920, 1080)
        cy.wait(1000)
        cy.get("#Action-button").click()

        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);

        // assert no harga tawar
        cy.get("#Harga-Tawar").type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Please insert bid price');
        })

        // inserting harga tawar
        cy.get("#Harga-Tawar").type(150000).type("{enter}")

        // waiting for mock api response
        cy.wait("@createBid")

        // asserting flash message
        cy.get("#flash-message").contains("Successfully bid the product")
    })

    it("should render edit button and redirec to update route", () => {
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

        cy.intercept("GET", "/api/v1/products/1",{
            "id": 15,
            "name": "Rubik 3x3",
            "price": 150000,
            "description": "Rubik",
            "status": "open_for_bid",
            "owner": {
                "id": 1,
                "name": "caprice",
                "city": "Kabupaten Kota Baru",
                "image_url": "https://res.cloudinary.com/djann8mt5/image/upload/v1658567948/binar-final-project/users/gzv3ypu8xku9xogz3d7w.jpg"
            },
            "category": {
                "id": 1,
                "name": "Hobi"
            },
            "images": [
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/qn0c7yebsoyetlys7rcf.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/yq3ly29ae3p3cdzmjll1.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/vgrzv157zvuusjqu8lu3.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/w8piacyrw0vjeboy3oyy.jpg"
            ]
        }).as("getProductOneByID")

        cy.intercept("POST", "/api/v1/products/*/bids", {
            product_id: 1,
            user_id: 8,
            request_price: 150000,
            status: "pending"
        }).as("createBid")

        // visiting product/1
        cy.visit("/product/1")
        cy.url().should('include', '/product/1')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductOneByID")

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
        
        cy.viewport(1920, 1080)
        cy.wait(1000)
        // clicking edit button
        cy.get("#Action-button").click()

        // assert redirect to update
        cy.url().should("include", "/update")
    })


    it("should render delete button and redirect to daftar jual", () => {
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

        cy.intercept("GET", "/api/v1/products/1",{
            "id": 15,
            "name": "Rubik 3x3",
            "price": 150000,
            "description": "Rubik",
            "status": "open_for_bid",
            "owner": {
                "id": 1,
                "name": "caprice",
                "city": "Kabupaten Kota Baru",
                "image_url": "https://res.cloudinary.com/djann8mt5/image/upload/v1658567948/binar-final-project/users/gzv3ypu8xku9xogz3d7w.jpg"
            },
            "category": {
                "id": 1,
                "name": "Hobi"
            },
            "images": [
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/qn0c7yebsoyetlys7rcf.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/yq3ly29ae3p3cdzmjll1.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/vgrzv157zvuusjqu8lu3.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658578176/binar-final-project/products/w8piacyrw0vjeboy3oyy.jpg"
            ]
        }).as("getProductOneByID")

        cy.intercept("DELETE", "/api/v1/products/*", {
            product_id: 1,
            user_id: 8,
            request_price: 150000,
            status: "pending"
        }).as("deleteProduct")

        // visiting product/1
        cy.visit("/product/1")
        cy.url().should('include', '/product/1')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductOneByID")

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

        // clicking delete button
        cy.viewport(1920, 1080)
        cy.wait(1000)
        cy.get("#delete-button").click()

        // waiting for mock api response
        cy.wait("@deleteProduct")

        // assert redirect to daftar jual
        cy.url().should("include", "/daftar-jual")
        cy.get("#flash-message").contains("Successfully deleting product")
    })


    it("should redirect to 404 page due to product not found when getting product", () => {
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

        cy.intercept("GET", "/api/v1/products/1",{
            statusCode: 404,
            body: {
                self: "Error",
                statusCode: 404,
                message: "Product Not Found"
            }
        }).as("getProductOneByID")
        
        // visiting product/1
        cy.visit("/product/1")
        cy.url().should('include', '/product/1')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductOneByID")
        
        // assert redirect to 404
        cy.url().should("include", "/404")
    })

    it("should redirect to 500 page due to internal server error when getting product", () => {
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

        cy.intercept("GET", "/api/v1/products/1",{
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("getProductOneByID")

        // visiting product/1
        cy.visit("/product/1")
        cy.url().should('include', '/product/1')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductOneByID")
        
        // assert redirect to 500
        cy.url().should("include", "/500")
    })

})