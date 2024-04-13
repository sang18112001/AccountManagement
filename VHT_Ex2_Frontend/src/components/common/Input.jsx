import React from "react";

const Input = ({content, name, type}) => {
  return (
    <div className="inputBox">
      <input
        type={type}
        name={name}
      />{" "}
      <i>{content}</i>
    </div>
  );
};

export default Input;
