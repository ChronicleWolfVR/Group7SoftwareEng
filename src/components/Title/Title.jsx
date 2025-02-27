import React from "react";
import "./Title.css";

// Title component that accepts id and children as props
const Title = ({ id, children }) => {
  // Render an h1 element with the given id and children
  return <h1 id={id}>{children}</h1>;
};

export default Title;
