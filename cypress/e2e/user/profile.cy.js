describe("User Profile Route", () => {
    beforeEach(() => {
        // loggin in before run
        cy.visit("/login")

        // mocking api login and home
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

        // mocking api update user
        cy.intercept("PUT", "/api/v1/profil", "Successfully updated profile").as("updateProfile")
        cy.intercept("POST", "/api/v1/usersimageupload", {
            user_id: 1,
            category_id: 1,
            name: "Product 2",
            price: 500000,
            description: "TESTING DESKRIPSI",
        }).as("usersimageupload")

        // insert credentials
        cy.get("#Email").type("kelvin@gmail.com")
        cy.get("#Password").type("kelvin123").type("{enter}")

        // waiting for mock api
        cy.wait('@login')

        // redirect to home page
        cy.url().should('include', '/?search=&category=')

        // waiting for api response home
        cy.wait('@getCategories')
        cy.wait('@getProducts')
        cy.wait("@getNotification")
    })
    
    it("should redirect to user profile", () => {
        // force to product/add
        cy.visit("/product/add")

        // check if url really redirect
        cy.url().should('include', '/user/profile?next=/product/add')

        // mocking api getCurrentUser
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            city: "Kota Bandung",
            address: "Bandung",
            phone: "08123456789",
            image_url: null
        
        }).as("getCurrentUser")
        
        // waiting for getCurrentUser api response to use it as default value
        cy.wait("@getCurrentUser")


        // mocking window alert
        const stub = cy.stub()
        cy.on('window:alert', stub);


        // inserting profile picture
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type=file]').attachFile(fixtureFile);

        // asserting null name
        cy.get("#Nama").clear().type("{enter}").then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Tolong isi nama anda');
        })

        // inserting name
        cy.get("#Nama").type("kelvin cen")
        

        // asserting null city
        cy.get("#Kota").click().clear().type("{enter}").then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Tolong pilih kota');
        })
        
        // choosing city
        cy.get("#Kota").click()
        cy.get("#Adiwerna").click()

        // inserting address
        cy.get("#Alamat").clear().type("testing alamat")

        // asserting null phone number
        cy.get("#No-Handphone").clear().type("{enter}").then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Tolong isi nomor telepon anda');
        })

        // inserting phone number
        cy.get("#No-Handphone").type("12345678")

        // submitting data
        cy.get("#Simpan").click()

        // waiting for updating data
        cy.wait("@updateProfile")
        cy.wait("@usersimageupload")

        // check if url really redirect
        cy.url().should('include', '/product/add')
    })

    it("should render user profile and successfully update user profile", () => {
        // go to user/profile
        cy.visit("/user/profile")
        cy.url().should('include', '/user/profile')

        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            city: null,
            address: null,
            phone: null,
            image_url: null
        
        }).as("getCurrentUser")
        
        cy.wait("@getCurrentUser")

        // inserting profile picture
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type=file]').attachFile(fixtureFile);

        // inserting name
        cy.get("#Nama").clear().type("kelvin cen")
        
        // inserting city
        cy.get("#Kota").click().clear()
        cy.get("#Adiwerna").click()

        // inserting address
        cy.get("#Alamat").clear().type("testing alamat")

        // inserting phone number
        cy.get("#No-Handphone").clear().type("12345678")
        cy.get("#Simpan").click()

        // waiting for api response
        cy.wait("@updateProfile")
        cy.wait("@usersimageupload")

        // asserting popup
        cy.url().should('include', '/user/profile')
        cy.get("#flash-message").contains("Successfully updated profile")
    })
    

    it("should redirect to 401 page due to unauthorized user when getting current user", () => {
        // going to product/add to test phoneprotectedroute
        cy.visit("/product/add")
        cy.url().should('include', '/user/profile?next=/product/add')

        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            statusCode: 401,
            body: {
                self: "Error",
                statusCode: 401,
                message: "Unauthorized"
            }
        }).as("getCurrentUser")
        
        cy.wait("@getCurrentUser")

        // assert redirect to login
        cy.url().should('include', '/login')
    })
    it("should redirect to 404 page due to user not found when getting current user", () => {
        // going to product/add to test phoneprotectedroute
        cy.visit("/product/add")
        cy.url().should('include', '/user/profile?next=/product/add')

        // mocking needed api 
        cy.intercept("GET", "/api/v1/currentuser", {
            statusCode: 404,
            body: {
                self: "Error",
                statusCode: 404,
                message: "User Not Found"
            }
        }).as("getCurrentUser")
        
        cy.wait("@getCurrentUser")

        // assert redirect to 404
        cy.url().should('include', '/404')
    })
    it("should redirect to 500 page due to internal server error when getting current user", () => {
        // going to product/add to test phoneprotectedroute
        cy.visit("/product/add")
        cy.url().should('include', '/user/profile?next=/product/add')

        cy.intercept("GET", "/api/v1/currentuser", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("getCurrentUser")
        
        cy.wait("@getCurrentUser")
        
        // assert redirect to 500
        cy.url().should('include', '/500')
    })


    it("should redirect to 404 due to user not found when updating data", () => {
        // going to user/profile
        cy.visit("/user/profile")
        cy.url().should('include', '/user/profile')


        // mocking needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            city: null,
            address: null,
            phone: null,
            image_url: null
        
        }).as("getCurrentUser")

        cy.intercept("PUT", "/api/v1/profil", {
            statusCode: 404,
            body: {
                self: "Error",
                statusCode: 404,
                message: "User Not Found"
            }
        }).as("updateProfile")
        
        cy.wait("@getCurrentUser")

        // input profile picture
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type=file]').attachFile(fixtureFile);

        // input name
        cy.get("#Nama").clear().type("kelvin cen")
        
        // input city
        cy.get("#Kota").click().clear()
        cy.get("#Adiwerna").click()

        // input address
        cy.get("#Alamat").clear().type("testing alamat")

        // input phone number
        cy.get("#No-Handphone").clear().type("12345678")
        cy.get("#Simpan").click()

        // wait for mock api response
        cy.wait("@updateProfile")

        // assert redirect to 404
        cy.url().should('include', '/404')
    })
    it("should redirect to 500 due to internal server error when updating data", () => {
        // going to user/profile
        cy.visit("/user/profile")
        cy.url().should('include', '/user/profile')

        // mock needed api
        cy.intercept("GET", "/api/v1/currentuser", {
            id: 1,
            name: "kelvin",
            city: null,
            address: null,
            phone: null,
            image_url: null
        
        }).as("getCurrentUser")

        cy.intercept("PUT", "/api/v1/profil", {
            statusCode: 500,
            body: {
                self: "Error",
                statusCode: 500,
                message: "Internal Server Error"
            }
        }).as("updateProfile")
        
        cy.wait("@getCurrentUser")

        // inserting profile picture
        const fixtureFile = 'gambar laptop.jpg';
        cy.get('input[type=file]').attachFile(fixtureFile);

        // inserting name
        cy.get("#Nama").clear().type("kelvin cen")
        
        // inserting city
        cy.get("#Kota").click().clear()
        cy.get("#Adiwerna").click()

        // inserting address
        cy.get("#Alamat").clear().type("testing alamat")

        // inserting phone number
        cy.get("#No-Handphone").clear().type("12345678")
        cy.get("#Simpan").click()

        // waiting for mock api response
        cy.wait("@updateProfile")

        // assert redirect to 500
        cy.url().should('include', '/500')
    })
})