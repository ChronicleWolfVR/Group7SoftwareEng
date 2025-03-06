import React, { useState } from "react";
import "./AddUserForm.css";

// AddUserForm component
const AddUserForm = ({ onClose, onAddUser }) => {
  const [name, setName] = useState(""); // State variable for name
  const [email, setEmail] = useState(""); // State variable for email

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Object with user data
    const newUser = {
      name,
      email,
    };

    // Call the onAddUser callback with the new user data
    onAddUser(newUser);

    // Close the form
    onClose();
  };

  return (
    <div className="form-container">
      {/* Close button */}
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      {/* Add user form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
