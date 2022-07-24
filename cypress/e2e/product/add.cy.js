describe("Add Product Route", () => {
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

        // mocking needed api
        cy.intercept("POST", "/api/v1/products", {
            user_id: 1,
            category_id: 1,
            name: "Product 2",
            price: 500000,
            description: "TESTING DESKRIPSI",
        }).as("createProducts")

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

        // waiting for mock home api
        cy.wait('@getCategories')
        cy.wait('@getProducts')
        cy.wait("@getNotification")
    })
    
    it("should add product and redirect to daftar jual route", () => {
        // mocking current user api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        }).as("getCurrentUser")
        
        // visiting product add
        cy.visit("/product/add")
        cy.url().should('include', '/product/add')

        // waiting for default api
        cy.wait("@getCurrentUser")
        cy.wait("@getCategories")


        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);

        // assert no product name
        cy.viewport(1080, 760)
        cy.get("#Nama-Product").type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Tolong isi nama product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Tolong isi nama product');
        })

        // inserting product name
        cy.get("#Nama-Product").type("Product 2")


        // assert no product price
        cy.get("#Harga-Product").type("{enter}").then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Tolong isi harga product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(3)).to.be.calledWith('Tolong isi harga product');
        })

        // inserting product price
        cy.get("#Harga-Product").type("500000")

        // assert no product category
        cy.get("#Harga-Product").type("{enter}").then(() => {
            expect(stub.getCall(4)).to.be.calledWith('Tolong isi kategori product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(5)).to.be.calledWith('Tolong isi kategori product');
        })

        // choosing category
        cy.get("#Kategory").click()
        cy.get("#Kesehatan").click()

        // inserting description
        cy.get("#Deskripsi").type("TESTING DESKRIPSI")

        // asserting no image
        cy.get("#Harga-Product").type("{enter}").then(() => {
            expect(stub.getCall(6)).to.be.calledWith('Tolong masukkan 1 foto product');
        })
        cy.get("#preview-button").click().then(() => {
            expect(stub.getCall(7)).to.be.calledWith('Tolong masukkan 1 foto product');
        })

        // inserting product image
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type="file"]').attachFile(fixtureFile);

        cy.wait(1000)

        // submitting product
        cy.get("#submit-button").click()

        // waiting for mock api response
        cy.wait("@createProducts")
        cy.wait("@productsimageupload")
       
        // assert redirect to daftar jual
        cy.url().should('include', '/daftar-jual')
    })

    it("should redirect to 500 page due to internal server error when creating new product", () => {

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

        cy.intercept("POST", "/api/v1/products", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("createProducts")
        
        // visiting product/add
        cy.visit("/product/add")
        cy.url().should('include', '/product/add')

        // waiting for default api
        cy.wait("@getCurrentUser")
        cy.wait("@getCategories")

        // inserting product name
        cy.viewport(1080, 760)
        cy.get("#Nama-Product").type("Product 2")

        // inserting product price
        cy.get("#Harga-Product").type("500000")

        // inserting product category
        cy.get("#Kategory").click()
        cy.get("#Kesehatan").click()

        // inserting product description
        cy.get("#Deskripsi").type("TESTING DESKRIPSI")

        // inserting product image
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type="file"]').attachFile(fixtureFile);

        cy.wait(1000)

        // submitting request
        cy.get("#submit-button").click()

        // waiting for mock api response
        cy.wait("@createProducts")
       
        // assert redirect to 500
        cy.url().should('include', '/500')
    })

    it("should should redirect to 500 due to internal server error when getting all categories", () => {
        // mock needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            name: "kelvin",
            city: "Jakarta",
            address: "Sebelah rumah tetangga",
            phone: "0123456789",
            image_url: "https://cdn1-production-images-kly.akamaized.net/SGiV1qTIa3cEYGFIgrWUijG_fWE=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/915666/original/029045100_1435747850-despicable_me_2_minions-1920x1080.jpg",
        }).as("getCurrentUser")

        cy.intercept("GET", "/api/v1/categories", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("getCategories")

        
        // visiting product/add
        cy.visit("/product/add")
        cy.url().should('include', '/product/add')

        // waiting for default api
        cy.wait("@getCurrentUser")
        cy.wait("@getCategories")

        // assert redirect to 500
        cy.url().should('include', '/500')
    })
})