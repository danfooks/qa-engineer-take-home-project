function CustomerModal() {
  const inputFields = [
    {
      name: "firstName",
      label: "First Name",
      dataTestId: "first-name",
    },
    {
      name: "lastName",
      label: "Last Name",
      dataTestId: "last-name",
    },
    {
      name: "email",
      label: "Email",
      dataTestId: "email",
    },
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
    {
      name: "city",
      label: "City",
      dataTestId: "city",
    },
    {
      name: "state",
      label: "State",
      dataTestId: "state",
    },
    {
      name: "zip",
      label: "Zip",
      dataTestId: "zip",
    },
    {
      name: "notes",
      label: "Notes",
      dataTestId: "notes",
    },
  ];
  return (
    <div className="modal-container">
      <div className="modal-body">
        <div className="modal-header">Add Customer</div>
        <div className="modal-content">
          <form>
            {inputFields.map((input) => {
              return (
                <>
                  <label htmlFor={input.name}>{input.label}</label>
                  <input
                    type="text"
                    name={input.name}
                    data-testid={input.dataTestId}
                  />
                </>
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerModal;
