export class CustomerManagementPage {

    readonly elements = {
        customerTable: () => cy.get('[data-cy="table_customers"]'),
        addCustomerButton: () => cy.get('[data-testid="add-customer-button"]')

        // Elements for searching, deleting, etc. would go here when the Customer Management is further developed
    }

    clickAddCustomer(){
       this.elements.addCustomerButton().click()
    }

    // Click edit button for a customer with a given email
    //  This implementation is not as robust as possible - If there's no guarantee of unique emails per customer,
    //  the using multiple pieces of customer information would be necessary to guarantee the correct customer is chosen
    clickEditButtonForCustomerByEmail(email: string) {
        this.elements.customerTable()
            .contains('td', email)
            .parent() // Get the row
            .find('[data-testid^="edit-customer-button"]') // Find the edit button in that row, regardless of the row number
            .click();
    }

    // Find the row for a customer with a given email
    //  Intended for validations and use for future functionality per row such as delete, disable, etc
    getCustomerRowByEmail(email: string) {
        return this.elements.customerTable()
            .contains('td', email)
            .parent(); // returns the row for further chaining
    }
}