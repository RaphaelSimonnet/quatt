const { fakerDE: faker } = require('@faker-js/faker');

Cypress.Commands.add('CreateUser', () => {
    const randomString = Math.random().toString(36).substring(2,10)
    const xemail = randomString+"@quatt.nl"
    cy.fixture('userPOST').then((payload) => {
        payload.email = xemail
        cy.log("EMAIL"+xemail)
        cy.request({
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: 'Bearer 0569f0d940174bc34a169081b7bb122b537b72d2e2dc0c35fc2a249bcf59d137',
    
                },
            body: payload
    
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property("name", "Raphael Simonnet");
            expect(res.body).to.have.property("gender", "male");
            expect(res.body).to.have.property("status", "active");
            expect(res.body.id).to.not.be.null;


        })
    })
})