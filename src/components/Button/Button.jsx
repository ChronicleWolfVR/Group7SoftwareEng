import React from "react";
import "./Button.css";

// Button component definition
function Button({ id, onClick, children }) {
  return (
    // Render a button element with the provided id, onClick handler, and children
    <button id={id} onClick={onClick}>
      {children}
    </button>
  );
}

// Export the Button component as the default export
export default Button;
