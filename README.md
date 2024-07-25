## Vistar Media QA Automation Take Home Project :construction:

### The Application :computer:
Imagine you are testing a simple CRUD application that manages customers for a small business. The "Customers" page of this application simply allows the user to create, search, update and remove customer records. Imagine this page is a simple table that displays information about customers. There is an "Add Customer" button that when clicked, displays a modal where the user can input and save information for a new customer. To search for an existing customer, the user can input any information about the customer into a search field on the page, which will filter resulting rows in the table. When the user selects a row in the table, a read-only modal called the "Customer Information" modal is displayed, which shows all of that customer's information.  To update an existing customer, you would select the "Edit" button within this modal. After editing any/all fields, the user would click the "Save" button to update the customer, which would dismiss the modal. To delete a customer from the application, the user would select the "Remove Customer" button within the "Customer Information" modal. Upon selecting this button, a confirmation modal appears where the user selects the "Yes" button to permanently delete the customer from the system.  Your job as a QA Automation Engineer is to create UI tests that cover critical functional scenarios of this application's "Customers" page.

### Task at Hand :pencil2:
* Create UI tests using TypeScript paired with Cypress for adding, editing, viewing, and removing customers from the application
* BONUS: create API tests for all/some of following endpoints:
  - POST to /customers
  - GET to /customers
  - GET to /customers/{customerId}
  - PUT to /customers/{customerId}
  - DELETE to /customers/{customerId}


### Further Instructions :clipboard:
* In order to setup this repository for local development, `cd` into the folder and run `npm install`. This should handle the installation of Cypress along with all required dependencies.
* You may spend as long as you wish on this project, but it is expected to take roughly 1-2 hours to complete this take-home project.
* You can implement anything you want! Dependencies, best practices, additional test cases, etc.
* Fee free to add additional test cases, even if they aren't completed, just to express testing scenarios that you are thinking about

### What We Are Evaluating :white_check_mark:
* Test organization and syntax
* QA best practices around test cases and function structure
* Critical thinking around test scenarios for front-end and API tests