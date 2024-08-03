it ('get user via GET method', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        cy.request({
            method: "GET",
            url: './public/v2/users/'+id,
            headers :
                {Authorization: 'Bearer 0569f0d940174bc34a169081b7bb122b537b72d2e2dc0c35fc2a249bcf59d137'},
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("name", "Raphael Simonnet");
            expect(res.body).to.have.property("gender", "male");
            expect(res.body).to.have.property("status", "active");
            expect(res.body.id).to.not.be.null

        })
    })
})

it ('Error flow: get user with incorrect id', () => {
        cy.request({
            method: "GET",
            failOnStatusCode: false,
            url: './public/v2/users/quatt',
            headers :
                {Authorization: 'Bearer 0569f0d940174bc34a169081b7bb122b537b72d2e2dc0c35fc2a249bcf59d137'},
        }).then((res) => {
            expect(res.status).to.eq(404);
            expect(res.body).to.have.property("message", "Resource not found")

        })
    })