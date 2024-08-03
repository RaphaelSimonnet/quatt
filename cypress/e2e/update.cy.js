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
                    {Authorization: 'Bearer 0569f0d940174bc34a169081b7bb122b537b72d2e2dc0c35fc2a249bcf59d137',
        
                    },
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

it ('Update user via PATCH method', () => {
    cy.CreateUser().then((res) => {

                let id = res.body.id
                const updateEmail = generateEmail();
                
        cy.fixture('userUPDATE').then((payload) => {
            payload.email = updateEmail
            cy.request({
                method: "PATCH",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: 'Bearer 0569f0d940174bc34a169081b7bb122b537b72d2e2dc0c35fc2a249bcf59d137',
        
                    },
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