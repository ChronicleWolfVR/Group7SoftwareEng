import React from 'react';     
import "./SideMenu.css";

const SideMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-close-button" onClick={toggleMenu}>
        ×
      </button>
      <ul>
        <li>Users</li>
        <li>Share</li>
        <li>Help</li>
      </ul>
    </div>
  );
};

export default SideMenu;