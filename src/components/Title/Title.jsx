import React from "react";
import "./Title.css";

const Title = ({ id, children }) => {
  return <h1 id={id}>{children}</h1>;
};

export default Title;
