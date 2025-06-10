import "./CustomerForm.css"
import { ButtonType } from "./Button";
import Button from "./Button";
import { ChangeEvent, useState } from "react";
import { useCustomerContext } from "./CustomerProvider";

interface CustomerInputField {
 name: string,
 label: string,
 dataTestId: string,
 required: boolean
}

const customerInputFields: Array<CustomerInputField> = [
  { name: "firstName", label: "First Name", dataTestId: "first-name", required: true},
  { name: "lastName", label: "Last Name", dataTestId: "last-name" , required: true},
  { name: "email", label: "Email", dataTestId: "email" , required: true},
  {
    name: "addressLine1",
    label: "Address Line 1",
    dataTestId: "address-line-1",
    required: true
  },
  {
    name: "addressLine2",
    label: "Address Line 2",
    dataTestId: "address-line-2",
    required: false
  },
  { name: "city", label: "City", dataTestId: "city" , required: true},
  { name: "state", label: "State", dataTestId: "state" , required: true},
  { name: "zip", label: "Zip", dataTestId: "zip" , required: true},
  { name: "notes", label: "Notes", dataTestId: "notes", required: false },
];


export interface CustomerData {
  id?: number;
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
  id: 0,
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

const CustomerForm = ({closeModal}) => {
  const {
    updateCustomerData,
   } = useCustomerContext();

  const [customerData, setCustomerData] = useState<CustomerData>(defaultCustomerData)
  const [ setResponse] = useState<any>(null);
  const [reload, setReload] = useState(false);
  

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!document.getElementById("customer_id"))
    // if add
    {
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      const data = await res.json();
      setReload(true);
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setResponse(data);

    } catch (err: any) {

    } finally {

    }
    closeModal();
  }
  else {
    //if update
      let customerId = document.getElementById("customer_id")?.innerText ?? 0
      try {
        const res = await fetch(`/api/customers/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });
  
        const data = await res.json();
        setReload(true);
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
  
        setResponse(data);
  
      } catch (err: any) {
  
      } finally {
  
      }
      window.location.reload();
  }
  }

  function handleFieldUpdate(e: ChangeEvent<HTMLInputElement>) {
    
    const {name, value} = e.target;

    if(!document.getElementById("customer_id"))
      {
        setCustomerData((previousCustomerData: CustomerData) => {
          const updatedCustomerData: CustomerData = {
            ...previousCustomerData,
            [name]: value
          }
          return updatedCustomerData;
        })
      }
    else
    {
      const firstNameInput = document.getElementsByName('firstName')[0] as HTMLInputElement;
      const firstName = firstNameInput.value;

      const lastNameInput = document.getElementsByName('lastName')[0] as HTMLInputElement;
      const lastName = lastNameInput.value;

      const emailInput = document.getElementsByName('email')[0] as HTMLInputElement;
      const email = emailInput.value;

      const addressline1Input = document.getElementsByName('addressLine1')[0] as HTMLInputElement;
      const addressLine1 = addressline1Input.value;

      const addressline2Input = document.getElementsByName('addressLine2')[0] as HTMLInputElement;
      const addressLine2 = addressline2Input.value;

      const cityInput = document.getElementsByName('city')[0] as HTMLInputElement;
      const city = cityInput.value;

      const state1Input = document.getElementsByName('state')[0] as HTMLInputElement;
      const state = state1Input.value;

      const zipInput = document.getElementsByName('zip')[0] as HTMLInputElement;
      const zip = zipInput.value;

      const notesElement = document.getElementsByName('notes')[0] as HTMLInputElement;
      const notes = notesElement.value;

      let thiscustom: CustomerData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        addressLine1: addressLine1,
        addressLine2: addressLine2 ?? "",
        city: city,
        state: state,
        zip: zip,
        notes: notes ?? "",

      }
      setCustomerData(() => {
        const updatedCustomerData: CustomerData = {
          ...thiscustom,
          [name]: value
        }
        return updatedCustomerData;
      })
    }
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
                  required={input.required}
                  value={customerData[input.name as keyof CustomerData]}
                />
              </div>
            ))}
            <Button className="modal-save-button" type={ButtonType.Submit} label="Save" dataTestId="save-button"/>
          </div>
        </form>
  )
            }

export default CustomerForm;


