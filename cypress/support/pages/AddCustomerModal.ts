export class AddCustomerModal {

    readonly elements ={

        firstName : () => cy.get('[data-testid="first-name"]'),
        lastName : () => cy.get('[data-testid="last-name"]'),
        email : () => cy.get('[data-testid="email"]'),
        addressLine1 : () => cy.get('[data-testid="address-line-1"]'),
        addressLine2 : () => cy.get('[data-testid="address-line-2"]'),
        city : () => cy.get('[data-testid="city"]'),
        state : () => cy.get('[data-testid="state"]'),
        zip : () => cy.get('[data-testid="zip"]'),
        notes : () => cy.get('[data-testid="notes"]'),
        saveButton : () => cy.get('[data-testid="save-button"]'),
        closeButton : () => cy.get('[class="close-button"]')
    }

    // Fill the AddCustomerModal form - addressLine2 and notes are optional and the method ensure the values are not empty before filling
    fillForm(firstName: string, lastName: string, email: string, addressLine1: string, city: string, state: string, zip: string, addressLine2?: string, notes?: string) {
        this.elements.firstName().type(firstName);
        this.elements.lastName().type(lastName);
        this.elements.email().type(email);
        this.elements.addressLine1().type(addressLine1);
        if(addressLine2) {
            this.elements.addressLine2().type(addressLine2);
        }
        this.elements.city().type(city);
        this.elements.state().type(state);
        this.elements.zip().type(zip);
        if(notes) {
            this.elements.notes().type(notes);
        }
    }

    // Step 4: method to submit
    saveForm() {
        this.elements.saveButton().click()
    }

    closeForm() {
        this.elements.closeButton().click()
    }
}