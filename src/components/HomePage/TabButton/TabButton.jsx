import React from "react";
import "./TabButton.css";

// TabButton component definition
export default function TabButton({ children, onClick, isSelected }) {
  return (
    <li>
      {/* Button element with conditional class based on isSelected prop */}
      <button className={isSelected ? "active" : undefined} onClick={onClick}>
        {/* Render children elements inside the button */}
        {children}
      </button>
    </li>
  );
}
