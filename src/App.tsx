import "./App.css";
import Button from "./Button";
import Modal from "./Modal";
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import { useState } from "react";
import { CustomerProvider } from "./CustomerProvider";
// TODO
/*
 [x] Handle modal save
 [ ] Store and retrieve customer data in local storage
 [ ] Mock api behavior to act async
 [ ] Success Message on save 
 [ ] Close Modal On save
 [ ] Form Validation (user cant save if non optional field values are empty strings)
 [ ] Investigate use of react context for handling customer data
 [ ] SetTimeout to fake API call and mount to table
 [ ] clean up code before next step?????(look at todos in files and clean up typing)
 [ ] revisit situation, discuss db and api / server
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
    <CustomerProvider>
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
  </CustomerProvider>
  );
}

export default App;
