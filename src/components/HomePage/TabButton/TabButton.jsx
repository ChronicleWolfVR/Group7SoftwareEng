import React from 'react';
import './TabButton.css';

export default function TabButton({ children, onClick, isSelected }) {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}