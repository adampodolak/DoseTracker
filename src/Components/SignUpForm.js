import React from "react";
import "./Form.css";

function SignUpForm() {
  return (
    <div className="formContainer">
      <div className="header">Sign up</div>
      <div className="email">
        <input type="email" placeholder="Email" />
      </div>
      <div className="password">
        <input type="password" placeholder="Password" />
      </div>
      <div className="checkPassword">
        <input type="password" placeholder="Confirm Password" />
      </div>
      <div className="footerTwo">
        <button>REGISTER</button>
      </div>
    </div>
  );
}

export default SignUpForm;
