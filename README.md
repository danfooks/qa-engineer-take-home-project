## Vistar Media QA Engineer Take-Home Project

### The Application
Imagine you are testing a simple CRUD application that manages customers for a small business. The "Customers" page of this application simply allows the user to create, search, update and remove customer records. This page is a simple table that displays information about customers. There is an "Add Customer" button that when selected, displays a modal where the user can input and save information for a new customer. The "New Customer" modal contains the following fields (fields marked with "*" are optional): 
* First Name
* Last Name
* Email
* Address Line 1
* Address Line 2 *
* City
* State
* Zip Code
* Notes *

PENDING FEATURE, NOT A PART OF APPLICATION but can be assumed for writing skipped test cases:
To search for an existing customer, the user can input any information about the customer into a search field on the "Customers" page, which will filter resulting rows in the table. When the user selects a row in the table, a read-only modal called the "Customer Information" modal is displayed, which shows all of that customer's information.  To update an existing customer, select the "Edit" button within this modal. After editing any/all fields, the user would click the "Save" button to update the customer, which would dismiss the modal.

To delete a customer from the application, select the "Remove Customer" button within the "Customer Information" modal. Upon selecting this button, a confirmation modal appears where the user selects the "Yes" button to permanently delete the customer from the system.  Your job as a QA Automation Engineer is to create UI tests that cover critical functional scenarios of this application's "Customers" page.

Below are a couple screenshots from this application, which is currently a work in progress as noted above:
![Customers Table](images/CustomersTable.png)
![Add Customer Modal](images/AddCustomerModal.png)

### Build Instructions
To spin up the application locally, you can run `npm install` from the root of the project to install the required dependencies, and then `npm run dev` to build and host the application locally. You will be able to view and interact with `data-testid` values for inputs and buttons, which may help you with writing your test cases.

### Task at Hand
* Create UI tests using TypeScript paired with Cypress for adding, editing, viewing, and removing customers from the application
* BONUS: create API tests for all/some of following endpoints:
  - `POST` to `/api/customers`
  - `GET` to `/api/customers`
  - `GET` to `/api/customers/{customerId}`
  - `PUT` to `/api/customers/{customerId}`
  - `DELETE` to `/api/customers/{customerId}`
 
If you choose to write some API test cases, the `POST` request uses a request body with the following format:
```
{
  firstName: 'John',
  lastName: 'Appleseed',
  email: 'johnappleseed@vistarmedia.com',
  addressLine1: '400 Market St',
  addressLine2: 'Suite 825',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19106',
  notes: 'This is a sample note.',
}
```

The `GET`, `PUT`, and `DELETE` requests contain response bodies with the same format, but also include `response.body.id` and `response.status`.

### Further Instructions and Specifications
* In order to setup this repository for local test development, `cd` into the `tests` folder and run `npm install`. This should handle the installation of Cypress along with all required dependencies. Your Cypress implementation will be built within this folder.
* Create and assume your own values for `data-test` attributes. For example, you could assume the `data-test` value for the "First Name" field is `[data-test="first-name"]`, and the `data-test` value for the "Save" button is `[data-test="save"]`
* You may spend as long as you wish on this project, but it is expected to take roughly 1-2 hours to complete this take-home project.
* You can implement anything you want! Dependencies, best practices, additional test cases, etc.
* Feel free to add additional test cases, even if they aren't completed, just to express testing scenarios that you are thinking about

### What We Are Evaluating
* Test organization and syntax
* QA best practices around test cases and function structure
* Critical thinking around test scenarios for front-end and API tests
