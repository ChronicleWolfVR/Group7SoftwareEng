import React from "react";
import "./User.css";

// User component definition
function User({ user }) {
  return (
    <div className="user">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Export the User component as the default export
export default User;