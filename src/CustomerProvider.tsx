import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

interface CustomerProvierProps {
  children: React.ReactElement
}

const customers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    notes: "Test user 1"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    addressLine1: "456 Oak Ave",
    addressLine2: "Suite 200",
    city: "Chicago",
    state: "IL",
    zip: "60611",
    notes: "Test user 2"
  }
];

//TODOS:
// store the customer data on local storage
// add types to this document
// Customer type, customer data, something with value, why is it mad?
const CustomerContext = createContext(null);

export const CustomerProvider = ({children}: CustomerProvierProps) => {
  const [customerData, setCustomerData]= useState(customers)
  console.log(setCustomerData)

  const updateCustomerData = (customer) => {
    //todo fake this to be async
    setCustomerData([...customerData, customer])
  }
  // Make set customer data function - fake an api call
  // Make get customer data function // ? Maybe
  const value = {
    customerData,
    updateCustomerData
  }

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export const useCustomerContext = () => useContext(CustomerContext)
