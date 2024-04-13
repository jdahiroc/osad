import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import uicLogo from "../assets/logo.png";
import "../styles/register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  //------------------
  // Handle Submit
  //------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      await createUser(email, password, displayName);
      navigate("/home");
    } catch {
      setErrMsg(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="register-section">
        <div className="img-container-login">
          <img src={uicLogo} alt="Uic logo" className="uic-logo" />
        </div>
        <div className="h1-container-signup">
          <h1>SIGN UP</h1>
        </div>
        <div className="error-container-register">
          {/* error message */}
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
        </div>

        <div className="form-container-register">
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label htmlFor="fullname">Full Name</label>
            <br />
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name here"
              autoComplete="off"
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <br />
            {/* School ID */}
            <label htmlFor="schoolId">School ID</label> <br />
            <input
              type="text"
              id="schoolId"
              placeholder="Enter your ID here"
              autoComplete="off"
              required
            />
            <br />
            {/* Email */}
            <label htmlFor="schoolId">Email</label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="Enter your email here"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            {/* Password */}
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Enter your password here"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            {/* Confirm Password */}
            <label htmlFor="confirm_pwd">Confirm Password:</label>
            <br />
            <input
              type="password"
              id="confirm_password"
              placeholder="Enter your confirm password here"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="login-container">
              Already have an account?
              <br />
              <span className="line">
                {/* put router link here */}
                <Link to="/"> Log in</Link>
              </span>
            </p>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
