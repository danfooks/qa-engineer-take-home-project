const customers = [];

customers.push({
	"firstName": "Timmy",
	"lastName": "O'Tool",
	"email": "OhDannyBoy@gmail.com",
	"addressLine1": "15 Main street",
	"addressLine2": "",
	"city": "Boston",
	"state": "Massachusetts",
	"zip": "02118",
	"notes": "",
	"id": 1
});
customers.push({
	"firstName": "Tammy",
	"lastName": "O'Tool",
	"email": "HotPantsMomma@gmail.com",
	"addressLine1": "15 Main street",
	"addressLine2": "",
	"city": "Boston",
	"state": "Massachusetts",
	"zip": "02118",
	"notes": "",
	"id": 2
});

let nextId = Math.max(...customers.map(c => c.id)) + 1;

const CUSTOMER_NOT_FOUND = 'Customer not found';
const requiredFields = ['firstName', 'lastName', 'email', 'addressLine1', 'city', 'state', 'zip'];

function validateCustomer(body) {
	const missing = requiredFields.filter(field => !body[field] || typeof body[field] !== 'string' || body[field].trim() === '');
	if (missing.length > 0) {
		return `Missing required fields: ${missing.join(', ')}`;
	}
	return null;
}

function pickCustomerFields(body) {
	return {
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		addressLine1: body.addressLine1,
		addressLine2: body.addressLine2 ?? "",
		city: body.city,
		state: body.state,
		zip: body.zip,
		notes: body.notes ?? "",
	};
}

const getCustomers = (request, response) => {
	response.status(200).json(customers);
};

const getCustomerById = (request, response) => {
	const foundCustomer = customers.find((cust) => cust.id === Number(request.params.customerId));
	if (!foundCustomer) {
		return response.status(404).json({ error: CUSTOMER_NOT_FOUND });
	}
	response.status(200).json(foundCustomer);
};

const deleteCustomer = (request, response) => {
	const foundIndex = customers.findIndex((customer) => customer.id === Number(request.params.customerId));
	if (foundIndex === -1) {
		return response.status(404).json({ error: CUSTOMER_NOT_FOUND });
	}
	customers.splice(foundIndex, 1);
	response.status(200).json({ message: 'Customer deleted' });
};

const addCustomers = (request, response) => {
	const validationError = validateCustomer(request.body);
	if (validationError) {
		return response.status(400).json({ error: validationError });
	}

	const emailExists = customers.some(c => c.email === request.body.email);
	if (emailExists) {
		return response.status(409).json({ error: 'A customer with this email already exists' });
	}

	const newCustomer = { id: nextId++, ...pickCustomerFields(request.body) };
	customers.push(newCustomer);
	response.status(201).json(newCustomer);
};

const updateCustomer = (request, response) => {
	const customerId = Number(request.params.customerId);
	const foundCustomer = customers.find((customer) => customer.id === customerId);
	if (!foundCustomer) {
		return response.status(404).json({ error: CUSTOMER_NOT_FOUND });
	}

	const validationError = validateCustomer(request.body);
	if (validationError) {
		return response.status(400).json({ error: validationError });
	}

	const emailTaken = customers.some(c => c.email === request.body.email && c.id !== customerId);
	if (emailTaken) {
		return response.status(409).json({ error: 'A customer with this email already exists' });
	}

	Object.assign(foundCustomer, pickCustomerFields(request.body));
	response.status(200).json(foundCustomer);
};

module.exports = {
	getCustomers,
	addCustomers,
	getCustomerById,
	deleteCustomer,
	updateCustomer
};
