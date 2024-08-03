let generateEmail = () => {
    const randomString = Math.random().toString(36).substring(2,10)
    const email = randomString+"@quatt.nl"
    return email
}

it ('Update user via PUT method', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        const updateEmail = generateEmail();        
        cy.fixture('userUPDATE').then((payload) => {
            payload.email = updateEmail
            cy.request({
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("name", "Jeanne Doe");
            expect(res.body).to.have.property("gender", "female");
            expect(res.body).to.have.property("status", "active");
            expect(res.body.id).to.not.be.null

            })
        })
    })
})

it ('Update user via PUT with missing name', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        const updateEmail = generateEmail();        
        cy.fixture('nameMissing').then((payload) => {
            payload.email = updateEmail
            cy.request({
                failOnStatusCode: false,
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("name", "Raphael Simonnet");
            expect(res.body).to.have.property("gender", "female");
            expect(res.body).to.have.property("status", "inactive");
            expect(res.body).to.have.property("id", id)

            })
        })
    })
})

it ('Update user via PUT with missing email', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id       
        cy.fixture('emailMissing').then((payload) => {
            cy.request({
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("name", "Jeanne Doe");
            expect(res.body).to.have.property("gender", "female");
            expect(res.body).to.have.property("status", "inactive");
            expect(res.body).to.have.property("id", id)

            })
        })
    })
})

it ('Update user via PUT with missing gender', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        const updateEmail = generateEmail();        
        cy.fixture('genderMissing').then((payload) => {
            payload.email = updateEmail
            cy.request({
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("name", "Jeanne Doe");
            expect(res.body).to.have.property("gender", "male");
            expect(res.body).to.have.property("status", "inactive");
            expect(res.body).to.have.property("id", id)

            })
        })
    })
})

it ('Error flow: Update user via PUT with missing status', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        const updateEmail = generateEmail();
        cy.fixture('statusMissing').then((payload) => {
            payload.email = updateEmail
            cy.request({
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("name", "Jeanne Doe");
            expect(res.body).to.have.property("gender", "female");
            expect(res.body).to.have.property("status", "active");
            expect(res.body).to.have.property("id", id)

            })
        })
    })
})

it ('Error flow: Update user via PUT with invalid ID', () => {
    const updateEmail = generateEmail();
    cy.fixture('userUPDATE').then((payload) => {
        payload.email = updateEmail
        cy.request({
            failOnStatusCode: false,
            method: "PATCH",
            url: './public/v2/users/'+"quatt",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload

    }).then((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.have.property("message", "Resource not found")
        })
    })
})

it ('Error Flow Update user via PUT method with invalid email, invalid gender and invalid status', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        cy.fixture('invalidUser').then((payload) => {
            cy.request({
                failOnStatusCode: false,
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(422);
            expect(res.body).to.be.an('Array')
            expect(res.body).to.have.length.of.at.least(2)
            expect(res.body[0]).to.have.property('field', "gender")
            expect(res.body[0]).to.have.property('message', "can't be blank, can be male of female")
            expect(res.body[1]).to.have.property('field', "status")
            expect(res.body[1]).to.have.property('message', "can't be blank")
            expect(res.body[2]).to.have.property('field', "email")
            expect(res.body[2]).to.have.property('message', "is invalid")


            })
        })
    })
})