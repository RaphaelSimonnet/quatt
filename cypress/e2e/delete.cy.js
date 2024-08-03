it ('Delete user via DELETE method', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        cy.request({
                method: "DELETE",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: 'Bearer 0569f0d940174bc34a169081b7bb122b537b72d2e2dc0c35fc2a249bcf59d137'},
        }).then((res) => {
            expect(res.status).to.eq(204);
        })
    })
})