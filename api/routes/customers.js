var router = require('express').Router({mergeParams:true})
const customerData = require('../data/customerData')

const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()


router.get('/', customerData.getCustomers)
router.get('/:customerId/details', customerData.getCustomerById)
router.delete('/:customerId', customerData.deleteCustomer)
router.post('/', jsonParser, customerData.addCustomers)
router.put('/:customerId', jsonParser, customerData.updateCustomer)

module.exports = router;