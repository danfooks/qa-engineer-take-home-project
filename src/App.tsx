import "./App.css";
import Button from "./Button";
import CustomerModal from "./CustomerModal";
import CustomerTable from "./CustomerTable";
import { useState } from "react";

// TODO
/*
 - Handle value setting in the modal
 - Handle modal styling and overall app styling
*/

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  function openCustomerModal(): void {
    setModalOpen((previous) => {
      console.log("open", previous, !previous);
      return !modalOpen;
    });
  }

  return (
    <div>
      <h1>Customer Management</h1>
      {modalOpen && <CustomerModal />}
      <CustomerTable />
      <Button
        label="Add Customer"
        onClick={openCustomerModal}
        data-testid="add-customer-button"
      />
    </div>
  );
}

export default App;
