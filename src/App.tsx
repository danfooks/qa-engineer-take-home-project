import "./App.css";
import CustomerModal from "./CustomerModal";
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
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john.doe@example.com</td>
            <td>123 Main St</td>
            <td>Apt 4B</td>
            <td>Springfield</td>
            <td>IL</td>
            <td>62701</td>
            <td>Test user 1</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>Smith</td>
            <td>jane.smith@example.com</td>
            <td>456 Oak Ave</td>
            <td>Suite 200</td>
            <td>Chicago</td>
            <td>IL</td>
            <td>60611</td>
            <td>Test user 2</td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={openCustomerModal}>
        Add Customer
      </button>
    </div>
  );
}

export default App;
