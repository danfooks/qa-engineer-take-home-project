import Button from "./Button";
import { useCustomerContext } from "./CustomerProvider";
import { useState, useEffect } from "react";
import CustomerForm, { CustomerData } from "./CustomerForm";
import Modal from "./Modal";

function CustomerTable() {
  const {    customerData  } = useCustomerContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCustomerID, setModalCustomerID] = useState('');
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  function handleModalToggle(event: React.MouseEvent<HTMLButtonElement>): void {

    const clickedElement = event.currentTarget;
    let customerId;
    const buttonId = clickedElement.getAttribute("data-testid")
    if (buttonId) {
      customerId = buttonId.split("-")[3];
    }

    if(customerId && customerId!= "")
    {      
      setModalCustomerID(customerId);
    }
    
    setModalOpen((previous) => {
      console.log("open", previous, !previous);
      return !modalOpen;
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        json.forEach((element: CustomerData) => {
          customerData.push({
            firstName: element.firstName,
            lastName: element.lastName,
            email: element.email,
            addressLine1: element.addressLine1,
            addressLine2: element.addressLine2 ?? "",
            city: element.city,
            state: element.state,
            zip: element.email,
            notes: element.notes ?? "",
            id: element.id
          })
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (

    <div className="table-container">
            {modalOpen && <Modal onClose={handleModalToggle} editCustomer={modalCustomerID}><CustomerForm closeModal={handleModalToggle}/> </Modal>}
      <table className="customer-table" data-cy="table_customers">
        <thead>
          <tr className="header-row">
            <th className="header-cell">First Name</th>
            <th className="header-cell">Last Name</th>
            <th className="header-cell">Email</th>
            <th className="header-cell">Address Line 1</th>
            <th className="header-cell">Address Line 2</th>
            <th className="header-cell">City</th>
            <th className="header-cell">State</th>
            <th className="header-cell">Zip Code</th>
            <th className="header-cell">Notes</th>
            <th className="header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
        {
        data?.map((customer, index) => (
          <tr key={index} className="table-row" data-testid={`row-${index}`}>
            <td className="table-cell">{customer.firstName}</td>
            <td className="table-cell">{customer.lastName}</td>
            <td className="table-cell">{customer.email}</td>
            <td className="table-cell">{customer.addressLine1}</td>
            <td className="table-cell">{customer.addressLine2}</td>
            <td className="table-cell">{customer.city}</td>
            <td className="table-cell">{customer.state}</td>
            <td className="table-cell">{customer.zip}</td>
            <td className="table-cell">{customer.notes}</td>
            <td className="table-cell"><Button label="Edit" onClick={handleModalToggle} dataTestId={`edit-customer-button-${customer.id}`}/></td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default CustomerTable;