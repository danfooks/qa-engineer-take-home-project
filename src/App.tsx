import "./App.css";
import Button from "./Button";
import Modal from "./Modal";
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import { useState } from "react";

// TODO
/*
 - Handle modal save
 - Form Validation (user cant save if non optional field values are empty strings)
 - Investigate use of react context for handling customer data
 - SetTimeout to fake API call and mount to table
 - persist table values in local storage to mimic db?
 - clean up code before next step????? 
 - Land in PR, hit the bar immediately
 - revisit situation, discuss db and api / server 
*/

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalToggle(): void {
    setModalOpen((previous) => {
      console.log("open", previous, !previous);
      return !modalOpen;
    });
  }

  return (
    <div>
      <h1>Customer Management</h1>
      {modalOpen && <Modal onClose={handleModalToggle}><CustomerForm /> </Modal>}
      <CustomerTable />
      <Button
        label="Add Customer"
        onClick={handleModalToggle}
        data-testid="add-customer-button"
      />
    </div>
  );
}

export default App;
