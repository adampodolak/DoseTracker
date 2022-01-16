import React from "react";
import "./Form.css";

function LogInForm() {
  return (
    <div className="formContainer">
      <div className="header">Sign in</div>
      <div className="emailContainer">
        <input type="email" placeholder="Email" />
      </div>
      <div className="passwordContainer">
        <input type="password" placeholder="Password" />
      </div>
      <div className="footer">
        <button>LOGIN</button>
      </div>
    </div>
  );
}

export default LogInForm;
