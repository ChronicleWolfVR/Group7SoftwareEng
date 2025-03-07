import React, { useState } from "react";
import "./SideMenu.css";
import Modal from "../Thermostat/Modal/Modal";
import User from "../Users/User"; // Import the User component
import AddUserForm from "./AddUserForm/AddUserForm"; // Import the AddUserForm component
import Share from "../Share/Share"; // Import the Share component

// SideMenu component definition
const SideMenu = ({ isOpen, toggleMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false); // State for add user form visibility
  const [users, setUsers] = useState([
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddUserFormOpen(false); // Close the add user form when modal is closed
    setIsShareModalOpen(false); // Close the share section when modal is closed
  };

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    setIsAddUserFormOpen(false); // Close the add user form after adding a user
  };

  const handleDeleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const handleShareModalOpen = () => {
    setIsShareModalOpen(true);
    setIsModalOpen(true);
  };

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
          <li onClick={handleShareModalOpen}>Share</li>
          <li>Help</li>
        </ul>
      </div>
      {/* Modal to display users or share section */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="user-modal">
          <h2>{isShareModalOpen ? "Share" : "Users"}</h2>
          {/* Conditionally render the user list, add user form, or share section */}
          {isShareModalOpen ? (
            <Share />
          ) : isAddUserFormOpen ? (
            <AddUserForm
              onClose={() => setIsAddUserFormOpen(false)}
              onAddUser={handleAddUser}
            />
          ) : (
            <div className="user-list scrollable">
              {users.map((user, index) => (
                <div key={index}>
                  <User user={user} />
                  <button className="delete-user" onClick={() => handleDeleteUser(index)}>Delete</button>
                </div>
              ))}
              <button className="add-user" onClick={() => setIsAddUserFormOpen(true)}>
                Add User
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

// Export the SideMenu component as the default export
export default SideMenu;