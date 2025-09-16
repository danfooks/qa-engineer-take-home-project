import { CustomerManagementPage } from '../support/pages/CustomerManagementPage';
import { AddCustomerModal } from '../support/pages/AddCustomerModal';

describe('Add Customer Tests', () => {
    const customersPage = new CustomerManagementPage();
    const addCustomerModal = new AddCustomerModal();

    beforeEach(() => {
        cy.visit('http://localhost:5173'); // Root URL of the app
        customersPage.clickAddCustomer(); // Open the modal before each test
    });

    it('Complete form fully', () => {
        addCustomerModal.fillForm(
            'Tim',
            "Watson",
            'tim.watson@demo.com',
            '10 W 4th St',
            'Bridgeport',
            'PA',
            '19405',
            'Apt 1',
            'Test full form'
        );

        addCustomerModal.saveForm();

        // Verify the new customer was added
        customersPage.getCustomerRowByEmail('tim.watson@demo.com')
            .should('exist');
    });

    it('Complete form without optional fields', () => {
        addCustomerModal.fillForm(
            'Tim',
            "Watson",
            'tim.watson.optional@demo.com',
            '10 W 4th St',
            'Bridgeport',
            'PA',
            '19405'
            // addressLine2 omitted
            // notes omitted
        );

        addCustomerModal.saveForm();

        // Verify the new customer was added
        customersPage.getCustomerRowByEmail('tim.watson.optional@demo.com')
            .should('exist');
    });

    it('Complete form with blank optional fields', () => {
        addCustomerModal.fillForm(
            'Tim',
            "Watson",
            'tim.watson.optional@demo.com',
            '10 W 4th St',
            'Bridgeport',
            'PA',
            '19405',
            '',
            ''
        );

        addCustomerModal.saveForm();

        // Verify the new customer was added
        customersPage.getCustomerRowByEmail('tim.watson.optional@demo.com')
            .should('exist');
    });

    it('Close form without saving', () => {
        addCustomerModal.fillForm(
            'Tim',
            "Watson",
            'tim.watson.close@demo.com',
            '10 W 4th St',
            'Bridgeport',
            'PA',
            '19405'
        );

        addCustomerModal.closeForm();

        // Verify the customer was not added
        customersPage.elements.customerTable()
            .should('not.contain', 'tim.watson.close@demo.com');
    });

    afterEach(() => {
        cy.clearLocalStorage();
    });
});
