import React from "react";
import "./Modal.css";

interface CustomerModalProps {
  onClose: () => void; // Callback to handle modal dismissal
  children: React.ReactNode
}

// TODO: Update modal to handle header? Or perhaps we just leave it to the user.... idk yet

const CustomerModal: React.FC<CustomerModalProps> = ({ onClose, children }) => {
  
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
};

export default CustomerModal;

