// Import React and necessary components
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

//Image
import uicLogo from "../assets/logo.png";

// CSS
import "../styles/login.css";

// Define Login component
const Login = () => {
  const navigate = useNavigate();
  const { signIn, updateProfile } = UserAuth();

  // useState Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formFilled, setFormFilled] = useState(false);

  const handleFormChange = () => {
    // Check if all form fields are filled
    if (email && password) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      // Sign in the user
      await signIn(email, password);

      // Fetch full name from Firestore based on email
      const fullName = await fetchFullNameByEmail(email);

      // Update user profile with full name
      await updateProfile(fullName);

      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setErrMsg("Invalid User Credentials. Please try again!");
    }
  };

  // Function to fetch full name from Firestore based on email
  const fetchFullNameByEmail = async (email) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      // Assuming there's only one user with the given email
      const userData = querySnapshot.docs[0].data();
      return userData.fullName;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="background-container">
        {/* Your login content */}
        <div className="error-container-login">
          {/* Error message */}
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
        </div>
        {/* Login Section */}
        <div className="login-section">
          <div className="img-container-login">
            <img src={uicLogo} alt="Uic logo" className="uic-logo" />
          </div>
          <div className="h1-container-login">
            <h1>LOGIN</h1>
          </div>
          <div className="form-container-login">
            <form onSubmit={handleSubmit} onChange={handleFormChange}>
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="forgotPassword">
                <Link to="/forgot-password">
                  <span className="forgotpassButton">Forgot Password?</span>
                </Link>
              </span>
              <br />
              <button
                className={formFilled ? "" : "disabled"}
                disabled={!formFilled}
              >
                Login
              </button>
            </form>
          </div>
          <p className="signup-container">
            Don&apos;t have an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
