// Generation of a random email to be used later
let generateEmail = () => {
    const randomString = Math.random().toString(36).substring(2,10)
    const email = randomString+"@quatt.nl"
    return email
}

it ('Create User with POST Method', () => {
    const xemail = generateEmail()
    cy.fixture('userPOST').then((payload) => {
        payload.email = xemail
        cy.log("EMAIL"+xemail)
        cy.request({
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload
    
        }).then((res)=>{
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property("name", "Raphael Simonnet");
            expect(res.body).to.have.property("gender", "male");
            expect(res.body).to.have.property("status", "active");
            expect(res.body.id).to.not.be.null;
        })
    })
})

it ('Error flows: name missing', () => {
    const xemail = generateEmail()
    cy.fixture('nameMissing').then((payload) => {
        payload.email = xemail
        cy.log("EMAIL"+xemail)
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload
    
        }).then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.body).to.be.an('Array')
            expect(res.body).to.have.length.of.at.least(1)
            expect(res.body[0]).to.have.property('field', "name")
            expect(res.body[0]).to.have.property('message', "can't be blank")
        })
    })
})

it ('Error flows: email missing', () => {
    const xemail = generateEmail()
    cy.fixture('emailMissing').then((payload) => {
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload
    
        }).then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.body).to.be.an('Array')
            expect(res.body).to.have.length.of.at.least(1)
            expect(res.body[0]).to.have.property('field', "email")
            expect(res.body[0]).to.have.property('message', "can't be blank")
        })
    })
})

it ('Error flows: gender missing', () => {
    const xemail = generateEmail()
    cy.fixture('genderMissing').then((payload) => {
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload
    
        }).then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.body).to.be.an('Array')
            expect(res.body).to.have.length.of.at.least(1)
            expect(res.body[0]).to.have.property('field', "gender")
            expect(res.body[0]).to.have.property('message', "can't be blank, can be male of female")
        })
    })
})

it ('Error flows: email missing', () => {
    const xemail = generateEmail()
    cy.fixture('statusMissing').then((payload) => {
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload
    
        }).then((res)=>{
            expect(res.status).to.eq(422);
            expect(res.body).to.be.an('Array')
            expect(res.body).to.have.length.of.at.least(1)
            expect(res.body[0]).to.have.property('field', "status")
            expect(res.body[0]).to.have.property('message', "can't be blank")
        })
    })
})

it ('Error flows: invalid user', () => {
    const xemail = generateEmail()
    cy.fixture('invalidUser').then((payload) => {
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: Cypress.env('TOKEN')},
            body: payload
    
        }).then((res)=>{
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
