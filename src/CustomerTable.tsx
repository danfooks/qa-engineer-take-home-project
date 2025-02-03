import { useCustomerContext } from "./CustomerProvider";
function CustomerTable() {
  const {
    customerData
  } = useCustomerContext();

  return (
    <div className="table-container">
      <table className="customer-table">
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
          </tr>
        </thead>
        <tbody className="table-body">
        {customerData.map((customer, index) => (
          <tr key={index} className="table-row">
            <td className="table-cell">{customer.firstName}</td>
            <td className="table-cell">{customer.lastName}</td>
            <td className="table-cell">{customer.email}</td>
            <td className="table-cell">{customer.addressLine1}</td>
            <td className="table-cell">{customer.addressLine2}</td>
            <td className="table-cell">{customer.city}</td>
            <td className="table-cell">{customer.state}</td>
            <td className="table-cell">{customer.zip}</td>
            <td className="table-cell">{customer.notes}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default CustomerTable;