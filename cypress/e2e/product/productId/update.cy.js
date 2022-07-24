describe("Add Product Route", () => {
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

        // mocking needed api
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
    
    it("should update product and redirect to daftar jual route", () => {
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

        cy.intercept("GET", "/api/v1/products/1", {
            "id": 1,
            "name": "anime",
            "price": 500000,
            "description": "asdas",
            "status": "open_for_bid",
            "owner": {
                "id": 1,
                "name": "kelvin",
                "city": "Jakarta",
                "image_url": null
            },
            "category": {
                "id": 1,
                "name": "Hobi"
            },
            "images": [
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658494430/binar-final-project/products/bn5yqoleyugzs92edan5.jpg",
            ]
        }).as("getProductByID")

        // visiting update route
        cy.visit("/product/1/update")
        cy.url().should('include', '/product/1/update')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductByID")
        cy.wait("@getCategories")

        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);

        cy.viewport(1080, 760)
        // assert no product name
        cy.get("#Nama-Product").clear().type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Tolong isi nama product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Tolong isi nama product');
        })

        // inserting product name
        cy.get("#Nama-Product").type("Product 2")


        // assert product price
        cy.get("#Harga-Product").clear().type("{enter}").then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Tolong isi harga product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(3)).to.be.calledWith('Tolong isi harga product');
        })

        // inserting product price
        cy.get("#Harga-Product").type("500000")

        // inserting product category
        cy.get("#Kategory").click()
        cy.get("#Kesehatan").click()

        // inserting product description
        cy.get("#Deskripsi").clear().type("TESTING DESKRIPSI")

        // inserting product image
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type="file"]').attachFile(fixtureFile);

        // clicking submit button
        cy.get("#submit-button").scrollIntoView().click()

        // waiting for mock api response
        cy.wait("@updateProduct")
        cy.wait("@productsimageupload")

        // assert redirect to daftar jual
        cy.url().should('include', '/daftar-jual')
    })


    it("should redirect to 404 page due to product not found when updating product", () => {
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

        cy.intercept("GET", "/api/v1/products/1", {
            "id": 1,
            "name": "anime",
            "price": 500000,
            "description": "asdas",
            "status": "open_for_bid",
            "owner": {
                "id": 1,
                "name": "kelvin",
                "city": "Jakarta",
                "image_url": null
            },
            "category": {
                "id": 1,
                "name": "Hobi"
            },
            "images": [
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658494430/binar-final-project/products/bn5yqoleyugzs92edan5.jpg",
            ]
        }).as("getProductByID")

        cy.intercept("PUT", "/api/v1/products/*", {
            statusCode: 404,
            body: {
                self: "Error",
                statusCode: 404,
                message: "Product not found"
            }
        }).as("updateProduct")

        // visiting update route
        cy.visit("/product/1/update")
        cy.url().should('include', '/product/1/update')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductByID")
        cy.wait("@getCategories")

        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);

        cy.viewport(1080, 760)
        // assert no product name
        cy.get("#Nama-Product").clear().type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Tolong isi nama product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Tolong isi nama product');
        })

        // inserting product name
        cy.get("#Nama-Product").type("Product 2")


        // assert product price
        cy.get("#Harga-Product").clear().type("{enter}").then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Tolong isi harga product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(3)).to.be.calledWith('Tolong isi harga product');
        })

        // inserting product price
        cy.get("#Harga-Product").type("500000")

        // inserting product category
        cy.get("#Kategory").click()
        cy.get("#Kesehatan").click()

        // inserting product description
        cy.get("#Deskripsi").clear().type("TESTING DESKRIPSI")

        // inserting product image
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type="file"]').attachFile(fixtureFile);

        // clicking submit button
        cy.get("#submit-button").scrollIntoView().click()

        // waiting for mock api response
        cy.wait("@updateProduct")
        cy.wait("@productsimageupload")

        // assert redirect to 404
        cy.url().should('include', '/404')
    })
    it("should redirect to 500 page due to internal server error when updating product", () => {
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

        cy.intercept("GET", "/api/v1/products/1", {
            "id": 1,
            "name": "anime",
            "price": 500000,
            "description": "asdas",
            "status": "open_for_bid",
            "owner": {
                "id": 1,
                "name": "kelvin",
                "city": "Jakarta",
                "image_url": null
            },
            "category": {
                "id": 1,
                "name": "Hobi"
            },
            "images": [
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658494429/binar-final-project/products/dgpkgusqtzi8en2o95up.jpg",
                "https://res.cloudinary.com/djann8mt5/image/upload/v1658494430/binar-final-project/products/bn5yqoleyugzs92edan5.jpg",
            ]
        }).as("getProductByID")

        cy.intercept("PUT", "/api/v1/products/*", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("updateProduct")

        // visiting update route
        cy.visit("/product/1/update")
        cy.url().should('include', '/product/1/update')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductByID")
        cy.wait("@getCategories")

        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);

        cy.viewport(1080, 760)
        // assert no product name
        cy.get("#Nama-Product").clear().type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Tolong isi nama product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Tolong isi nama product');
        })

        // inserting product name
        cy.get("#Nama-Product").type("Product 2")


        // assert product price
        cy.get("#Harga-Product").clear().type("{enter}").then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Tolong isi harga product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(3)).to.be.calledWith('Tolong isi harga product');
        })

        // inserting product price
        cy.get("#Harga-Product").type("500000")

        // inserting product category
        cy.get("#Kategory").click()
        cy.get("#Kesehatan").click()

        // inserting product description
        cy.get("#Deskripsi").clear().type("TESTING DESKRIPSI")

        // inserting product image
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type="file"]').attachFile(fixtureFile);

        // clicking submit button
        cy.get("#submit-button").scrollIntoView().click()

        // waiting for mock api response
        cy.wait("@updateProduct")
        cy.wait("@productsimageupload")

        // assert redrect to 500
        cy.url().should('include', '/500')
    })


    it("should redirect to 404 page due to product not found when getting default value", () => {
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

        cy.intercept("GET", "/api/v1/products/1", {
            statusCode: 404,
            body: {
                self: "Error",
                statusCode: 404,
                message: "Product Not Found"
            }
        }).as("getProductByID")

        // visiting update route
        cy.visit("/product/1/update")
        cy.url().should('include', '/product/1/update')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductByID")
        cy.wait("@getCategories")
       
        // assert redirect to 404
        cy.url().should('include', '/404')
    })


    it("should redirect to 500 page due to internal server error when getting default value", () => {
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

        cy.intercept("GET", "/api/v1/products/1", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Serve Error"
            }
        }).as("getProductByID")

        // visiting update route
        cy.visit("/product/1/update")
        cy.url().should('include', '/product/1/update')

        // waiting for mock api response
        cy.wait("@getCurrentUser")
        cy.wait("@getProductByID")
        cy.wait("@getCategories")
       
        // assert redirect to 500
        cy.url().should('include', '/500')
    })
})