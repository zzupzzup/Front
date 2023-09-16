import React from "react";

const Input = ({ label, type, placeholder, onChange, value, isValid }) => {
  return (
    <div className="input_items">
      <div className="input_text">
        <span className={`text_bar ${isValid ? "success" : "fail"}`}>{label}</span>
      </div>
      <div className={`input_content ${isValid ? "success" : "fail"}`}>
        <input
          className="textinput"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
