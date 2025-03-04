import React, { useEffect } from "react";
import "./Modal.css";

// Modal component to display a modal dialog
const Modal = ({ isOpen, onClose, children }) => {
  // useEffect hook to add/remove 'modal-open' class to/from body when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // Cleanup function to remove 'modal-open' class from body when component unmounts
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  // If modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    // Modal overlay
    <div className="modal-overlay">
      {/* Modal content */}
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {/* Render children elements inside modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
