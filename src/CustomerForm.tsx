import "./CustomerForm.css"
import { ButtonType } from "./Button";
import Button from "./Button";

const customerInputFields = [
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


const CustomerForm = () => {
  
  function handleSaveCustomer(e: Event): void {
    e.preventDefault(); // prevents the page from reloading
    console.log('this jawn works');
  }

  return (
      <form onSubmit={(e) => handleSaveCustomer(e)}>
          <div className="form-grid">
            {customerInputFields.map((input) => (
              <div className="form-group" key={input.name}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type="text"
                  name={input.name}
                  data-testid={input.dataTestId}
                />
              </div>
            ))}
            <Button type={ButtonType.Submit} label="Save" dataTestId="save-button"/>
          </div>
        </form>
  )
}

export default CustomerForm;
