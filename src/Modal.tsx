import "./Modal.css";
import React, { useState, useEffect } from 'react';
import { useCustomerContext } from "./CustomerProvider";
import { CustomerData } from "./CustomerForm";


interface CustomerModalProps {
  onClose: () => void; // Callback to handle modal dismissal
  children: React.ReactNode;
  editCustomer: string
}

// TODO: Update modal to handle header? Or perhaps we just leave it to the user.... idk yet

const CustomerModal: React.FC<CustomerModalProps> = ({ onClose, children, editCustomer}) => {
  if(editCustomer == undefined ||editCustomer === "")
  {
  return (
    <div className="modal-container" onClick={onClose}>
      <div
        className="modal-body"
        onClick={(e) =>
          e.stopPropagation()
        } /* Prevent closing when clicking inside the modal */
      >
        <div className="close-button" onClick={onClose}>X</div>
        <div className="modal-header">Add Customer</div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
  }

  const { customerData } = useCustomerContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CustomerData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/customers/${editCustomer}/details`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);

        let firstName = document.querySelector('input[name="firstName"]') as HTMLInputElement;
        if (firstName) {
          firstName.value = json.firstName;
        }

        let lastName = document.querySelector('input[name="lastName"]') as HTMLInputElement;
        if (lastName) {
          lastName.value = json.lastName;
        }

        let email = document.querySelector('input[name="email"]') as HTMLInputElement;
        if (email) {
          email.value = json.email;
        }

        let addressLine1 = document.querySelector('input[name="addressLine1"]') as HTMLInputElement;
        if (addressLine1) {
          addressLine1.value = json.addressLine1;
        }

        let addressLine2 = document.querySelector('input[name="addressLine2"]') as HTMLInputElement;
        if (addressLine2) {
          addressLine2.value = json.addressLine2 ?? "";
        }

        let city = document.querySelector('input[name="city"]') as HTMLInputElement;
        if (city) {
          city.value = json.city;
        }

        let state = document.querySelector('input[name="state"]') as HTMLInputElement;
        if (state) {
          state.value = json.state;
        }

        let zip = document.querySelector('input[name="zip"]') as HTMLInputElement;
        if (zip) {
          zip.value = json.zip;
        }

        let notes = document.querySelector('input[name="notes"]') as HTMLInputElement;
        if (notes) {
          notes.value = json.notes ?? "";
        }

        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchData();
  
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="modal-container" onClick={onClose}>
      <div
        className="modal-body"
        onClick={(e) =>
          e.stopPropagation()
        } /* Prevent closing when clicking inside the modal */
      >
        <div className="close-button" onClick={onClose}>X</div>
        <div className="modal-header">Edit Customer</div>
        <div id="customer_id" style={{ display: 'none' }}>{editCustomer}</div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );

};

export default CustomerModal;

