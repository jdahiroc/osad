import { useState } from "react";
import { Link } from "react-router-dom";
import uicLogo from "../assets/logo.png";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="login-section">
        <div className="img-container-login">
          <img src={uicLogo} alt="Uic logo" className="uic-logo" />
        </div>
        <div className="h1-container-login">
          <h1>LOG IN</h1>
        </div>
        <div className="form-container-login">
          <form>
            <label htmlFor="studentId" className="labelstdID">
              Student ID
            </label>
            <br />
            <input
              type="text"
              id="studentId"
              placeholder="Enter your ID here"
              // ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <br />
            <label htmlFor="password" className="labelstdPWD">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Enter your password here"
              // ref={userRef}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <br />
            <Link to="/dashboard">
              <button>Login</button>
            </Link>
          </form>
        </div>
        <p className="signup-container">
          Dont have an Account?
          <br />
          <span className="line">
            {/* put router link here */}
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
