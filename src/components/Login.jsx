import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import uicLogo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  // const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (e) {
      setErrMsg(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="login-section">
        <div className="img-container-login">
          <img src={uicLogo} alt="Uic logo" className="uic-logo" />
        </div>
        <div className="h1-container-login">
          <h1>LOG IN</h1>
        </div>
        <div className="error-container-register">
          {/* error message */}
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
        </div>
        <div className="form-container-login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="studentId" className="labelstdID">
              Student Email
            </label>
            <br />
            <input
              type="text"
              id="studentId"
              placeholder="Enter your email here"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
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
              required
            />
            <br />
            <button>Login</button>
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
