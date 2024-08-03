let generateEmail = () => {
    const randomString = Math.random().toString(36).substring(2,10)
    const email = randomString+"@quatt.nl"
    return email
}

it ('Error flow: invalid token for a GET method', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        cy.request({
            method: "GET",
            url: './public/v2/users/'+id,
            failOnStatusCode: false,
            headers :
                {Authorization: 'Bearer quatt'},
        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property("message", "Invalid token")

        })
    })
})

it ('Error Flow: invalid token for a PATCH method', () => {
    cy.CreateUser().then((res) => {

                let id = res.body.id
                const updateEmail = generateEmail();
                
        cy.fixture('userUPDATE').then((payload) => {
            payload.email = updateEmail
            cy.request({
                failOnStatusCode: false,
                method: "PATCH",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: 'Bearer quatt',
        
                    },
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property("message", "Invalid token")

        })
    })
})
})

it ('Error Flow: invalid token for a PUT method', () => {
    cy.CreateUser().then((res) => {

                let id = res.body.id
                const updateEmail = generateEmail();
                
        cy.fixture('userUPDATE').then((payload) => {
            payload.email = updateEmail
            cy.request({
                failOnStatusCode: false,
                method: "PUT",
                url: './public/v2/users/'+id,
                headers :
                    {Authorization: 'Bearer quatt',
        
                    },
                body: payload

        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property("message", "Invalid token")

        })
    })
})
})

it ('Error flow: invalid token for a DELETE method', () => {
    cy.CreateUser().then((res) => {
        let id = res.body.id
        cy.request({
            method: "DELETE",
            url: './public/v2/users/'+id,
            failOnStatusCode: false,
            headers :
                {Authorization: 'Bearer quatt'},
        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property("message", "Invalid token")

        })
    })
})

it ('Error flow: invalid token for a POST method', () => {
    const xemail = generateEmail()
    cy.fixture('userPOST').then((payload) => {
        payload.email = xemail
        cy.log("EMAIL"+xemail)
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url:"./public/v2/users",
            headers :
                {Authorization: 'Bearer quatt'},
            body: payload
    
        }).then((res)=>{
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property("message", "Invalid token")

        })
    })
})