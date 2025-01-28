import "./CustomerForm.css"
import { ButtonType } from "./Button";
import Button from "./Button";
import { ChangeEvent, useState } from "react";

interface CustomerInputField {
 name: string,
 label: string,
 dataTestId: string,
}

const customerInputFields: Array<CustomerInputField> = [
  { name: "firstName", label: "First Name", dataTestId: "first-name" },
  { name: "lastName", label: "Last Name", dataTestId: "last-name" },
  { name: "email", label: "Email", dataTestId: "email" },
  {
    name: "addressLine1",
    label: "Address Line 1",
    dataTestId: "address-line-1",
  },
  {
    name: "addressLine2",
    label: "Address Line 2",
    dataTestId: "address-line-2",
  },
  { name: "city", label: "City", dataTestId: "city" },
  { name: "state", label: "State", dataTestId: "state" },
  { name: "zip", label: "Zip", dataTestId: "zip" },
  { name: "notes", label: "Notes", dataTestId: "notes" },
];


export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
}

const defaultCustomerData: CustomerData = {
  firstName: '',
  lastName: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
  notes: '',
}

const CustomerForm = () => {
  const [customerData, setCustomerData] = useState<CustomerData>(defaultCustomerData)
  function handleSaveCustomer(e: Event): void {
    e.preventDefault(); // prevents the page from reloading
    console.log('this jawn works');
  }

  console.log(customerData)

  function handleFieldUpdate(e: ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;

    setCustomerData((previousCustomerData: CustomerData) => {
      const updatedCustomerData: CustomerData = {
        ...previousCustomerData,
        [name]: value
      }
      return updatedCustomerData;
    })
  }

  return (
      <form onSubmit={(e) => handleSaveCustomer(e)}>
          <div className="form-grid">
            {customerInputFields.map((input) => (
              <div className="form-group" key={input.name}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  onChange={(e) => handleFieldUpdate(e)}
                  type="text"
                  name={input.name}
                  data-testid={input.dataTestId}
                  value={customerData[input.name as keyof CustomerData]}
                />
              </div>
            ))}
            <Button type={ButtonType.Submit} label="Save" dataTestId="save-button"/>
          </div>
        </form>
  )
}

export default CustomerForm;
