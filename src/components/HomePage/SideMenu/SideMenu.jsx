import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
import Modal from "../Thermostat/Modal/Modal";
import User from "../Users/User"; // Import the User component
import AddUserForm from "./AddUserForm/AddUserForm"; // Import the AddUserForm component
import Share from "../Share/Share"; // Import the Share component
import Help from "../Help/Help"; // Import the Help component

// SideMenu component definition
const SideMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false); // State for add user form visibility
  const [isManager, setIsManager] = useState(false); // State to toggle between manager and normal user
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); // State for edit profile form visibility
  const [users, setUsers] = useState([
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
  ]);
  const activeUser = { name: "User", email: "user@example.com" }; // Example active user
  const [editUser, setEditUser] = useState(null); // State to store the user being edited

  const handleLogout = () => {
    // Clear any user-related state or context here if needed
    alert("Logged out successfully");
    navigate("/login"); // Navigate to the login page
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddUserFormOpen(false); // Close the add user form when modal is closed
    setIsShareModalOpen(false); // Close the share section when modal is closed
    setIsHelpModalOpen(false); // Close the help section when modal is closed
    setIsEditProfileOpen(false); // Close the edit profile form when modal is closed
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

  const handleHelpModalOpen = () => {
    setIsHelpModalOpen(true);
    setIsModalOpen(true);
  };

  const handleEditProfileOpen = (user) => {
    setEditUser(user);
    setIsEditProfileOpen(true);
  };

  const handleEditProfile = (updatedDetails) => {
    console.log("Updated Details:", updatedDetails);
    setIsEditProfileOpen(false); // Close the edit profile form after updating details
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
          <li onClick={handleHelpModalOpen}>Help</li>
          <li onClick={handleLogout}>Logout</li> {/* Logout button */}
        </ul>
        {/* Toggle button for manager/normal user */}
        <button onClick={() => setIsManager(!isManager)}>
          {isManager ? "Switch to Normal User" : "Switch to Manager"}
        </button>
      </div>
      {/* Modal to display users, share section, help section, or edit profile form */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="user-modal">
          <h2>
            {isShareModalOpen
              ? "Share"
              : isHelpModalOpen
              ? "Help"
              : isEditProfileOpen
              ? "Edit Profile"
              : "Users"}
          </h2>
          {/* Conditionally render the user list, add user form, share section, help section, or edit profile form */}
          {isShareModalOpen ? (
            <Share />
          ) : isHelpModalOpen ? (
            <Help />
          ) : isAddUserFormOpen ? (
            <AddUserForm
              onClose={() => setIsAddUserFormOpen(false)}
              onAddUser={handleAddUser}
            />
          ) : isEditProfileOpen ? (
            <EditProfileForm
              user={editUser || activeUser}
              onClose={() => setIsEditProfileOpen(false)}
              onEditProfile={handleEditProfile}
            />
          ) : (
            <div className="user-list scrollable">
              {isManager ? (
                users.map((user, index) => (
                  <div key={index}>
                    <User user={user} />
                    <button
                      className="delete-user"
                      onClick={() => handleDeleteUser(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit-profile-button"
                      onClick={() => handleEditProfileOpen(user)}
                    >
                      Edit Profile
                    </button>
                  </div>
                ))
              ) : (
                <User user={activeUser} />
              )}
              {isManager && (
                <button
                  className="add-user"
                  onClick={() => setIsAddUserFormOpen(true)}
                >
                  Add User
                </button>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

// Export the SideMenu component as the default export
export default SideMenu;

// EditProfileForm component definition
const EditProfileForm = ({ user, onClose, onEditProfile }) => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="save-button">
        Save
      </button>
      <button type="button" className="cancel-button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};
