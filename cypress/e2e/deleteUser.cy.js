it ('Delete user via DELETE method', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        cy.request({
                method: "DELETE",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: Cypress.env('TOKEN')},
        }).then((res) => {
            expect(res.status).to.eq(204);
        })
    })
})

it ('Error Flow: Delete user invalid ID', () => {
    cy.request({
        method: "DELETE",
        failOnStatusCode: false,
        url: './public/v2/users/quatt',
        headers :
            {AAuthorization: Cypress.env('TOKEN')},
    }).then((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.have.property("message", "Resource not found")

    })
})
