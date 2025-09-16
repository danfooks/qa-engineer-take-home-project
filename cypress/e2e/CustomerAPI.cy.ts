describe('Customer API Tests', () => {
    let customerId: string;

    const customerPayload = {
        first_name: 'Tim',
        last_name: 'Watson',
        email: `tim.watson.${Date.now()}@demo.com`, // unique email each run
        address_line_1: '10 W 4th St',
        address_line_2: 'Suite 825',
        city: 'Bridgeport',
        state: 'PA',
        zip_code: '19405',
        notes: 'This is a sample note',
    };

    // set up test customer before each test run
    before('POST /customers - create a new customer', () => {
        cy.request('POST', '/customers', customerPayload)
            .then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('id');
                expect(response.body.email).to.eq(customerPayload.email);
                customerId = response.body.id;
            });
    });

    // delete test customer after each test run
    after('DELETE /customers/{customerId} - should delete the customer', () => {
        cy.request('DELETE', `/customers/${customerId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
            });

        // confirm deletion
        cy.request({ method: 'GET', url: `/customers/${customerId}`, failOnStatusCode: false })
            .then((response) => {
                expect(response.status).to.eq(404);
            });
    });

    it('GET /customers - return list including new customer', () => {
        cy.request('GET', '/customers')
            .then((response) => {
                expect(response.status).to.eq(200);
                const customerEmails = response.body.map((c: any) => c.email);
                expect(customerEmails).to.include(customerPayload.email);
            });
    });

    it('GET /customers/{customerId} - return the created customer', () => {
        cy.request('GET', `/customers/${customerId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.email).to.eq(customerPayload.email);
            });
    });

    // using ... spread operator for concise code and to make refactoring easier depending on the input PUT /customers/{customerId} can accept
    it('PUT /customers/{customerId} - update the customer', () => {
        const updatedPayload = {
            ...customerPayload,
            first_name: 'Timothy',
            notes: 'Updated note',
        };

        cy.request('PUT', `/customers/${customerId}`, updatedPayload)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.first_name).to.eq('Timothy');
                expect(response.body.notes).to.eq('Updated note');
            });
    });
});
