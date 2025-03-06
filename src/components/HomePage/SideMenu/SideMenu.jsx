import React, { useState } from "react";
import "./SideMenu.css";
import Modal from "../Thermostat/Modal/Modal";
import User from "../Users/User"; // Import the User component

// SideMenu component definition
const SideMenu = ({ isOpen, toggleMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // List of users
  const users = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
  ];

  return (
    <>
      {/* Apply 'open' class if isOpen is true */}
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        {/* Button to close the menu */}
        <button className="menu-close-button" onClick={toggleMenu}>
          ×
        </button>
        {/* Menu items */}
        <ul>
          <li onClick={handleOpenModal}>Users</li>
          <li>Share</li>
          <li>Help</li>
        </ul>
      </div>
      {/* Modal to display users */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="user-modal">
          <h2>Users</h2>
          {/* Render the list of users inside the modal */}
          {users.map((user, index) => (
            <User key={index} user={user} />
          ))}
        </div>
      </Modal>
    </>
  );
};

// Export the SideMenu component as the default export
export default SideMenu;