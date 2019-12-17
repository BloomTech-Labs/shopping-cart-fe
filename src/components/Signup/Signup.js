import React from "react";
import "./Signup.css";

const Signup = () => {
  const validatePasswords = (a, b) => {
    if (a === b) {
        return true;
    }
    return false;
  }
  return (
    <div className="signup">
      <div id="logo">Logo</div>
      <div id="register">
        Register new
        <br />
        account
      </div>
      <form>
        <input placeholder="Phone Number"></input>
        <input placeholder="Password"></input>
        <input placeholder="Confirm Password"></input>
        <button>Register</button>
      </form>
      <p>
        or <a href="#">login</a> instead
      </p>
    </div>
  );
};

export default Signup;
