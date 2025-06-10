const { response, request } = require('express')

const customers = [];
customers.push(
{
	"firstName":"Timmy",
    "lastName":"O'Tool",
    "email":"OhDannyBoy@gmail.com",
    "addressLine1": "15 Main street",
    "addressLine2": "",
    "city": "Boston",
    "state": "Massachusetts",
    "zip": "02118",
    "notes": "",
    "id":1
})
customers.push({
"firstName":"Tammy", 
"lastName":"O'Tool",
"email":"HotPantsMomma@gmail.com",
"addressLine1": "15 Main street",
"addressLine2": "",
"city": "Boston",
"state": "Massachusetts",
"zip": "02118",
"notes": "",
"id":2
})

const getCustomers = (request, response) => {
		response.status(200).json(customers)
}

const getCustomerById = (request, response) => {
    let foundCustomer = customers.find((cust) => cust.id == request.params.customerId)
    if(foundCustomer == undefined) {
        response.status(404).json()
    }
    response.status(200).json(foundCustomer)
}

const deleteCustomer = (request, response) => {
    const foundCustomer = customers.findIndex((customer) => customer.id == request.params.customerId)

    if(foundCustomer == -1) {
        response.status(404).json()
    }
    customers.splice(foundCustomer, 1);
    response.status(200).json()
 }

const addCustomers = (request, response) => {
    var currentLength = customers.length;
    currentLength++;
    customers.push({
        "id":currentLength,
        "firstName": request.body.firstName,
        "lastName":request.body.lastName,
        "email":request.body.email,
        "addressLine1":request.body.addressLine1,
        "addressLine2":request.body.addressLine2 ?? "",
        "city":request.body.city,
        "state":request.body.state,
        "zip":request.body.zip,
        "notes":request.body.notes ?? "",
    })

    let newCustomer = customers.find((cust) => cust.id === currentLength)
    response.status(201).json(newCustomer)
}

const updateCustomer = (request, response) => {
    const foundCustomer = customers.find((customer) => customer.id == request.params.customerId)

    foundCustomer.firstName = request.body.firstName
    foundCustomer.lastName = request.body.lastName
    foundCustomer.email = request.body.email
    foundCustomer.addressLine1 = request.body.addressLine1
    foundCustomer.addressLine2 = request.body.addressLine2 ?? ""
    foundCustomer.city = request.body.city
    foundCustomer.state = request.body.state
    foundCustomer.zip = request.body.zip
    foundCustomer.notes = request.body.notes ?? ""

    response.status(201).json(foundCustomer)
}


module.exports = {
	getCustomers,
    addCustomers,
    getCustomerById,
    deleteCustomer,
    updateCustomer
}