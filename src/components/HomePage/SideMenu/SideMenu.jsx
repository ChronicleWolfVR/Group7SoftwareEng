import React from "react";
import "./SideMenu.css";

// SideMenu component definition
const SideMenu = ({ isOpen, toggleMenu }) => {
  return (
    // Apply 'open' class if isOpen is true
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      {/* Button to close the menu */}
      <button className="menu-close-button" onClick={toggleMenu}>
        ×
      </button>
      {/* Menu items */}
      <ul>
        <li>Users</li>
        <li>Share</li>
        <li>Help</li>
      </ul>
    </div>
  );
};

// Export the SideMenu component as the default export
export default SideMenu;
