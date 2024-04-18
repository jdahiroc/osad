import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getDocs, collection, query, where } from "firebase/firestore"; // Import Firestore functions

import uicLogo from "../assets/logo.png";
import "../styles/login.css";
import { db } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, updateProfile } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
      setErrMsg("Invalid Credentials. Try again!");
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
      throw error; // Propagate the error
    }
  };

  return (
    <>
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
          <h1>LOG IN</h1>
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button>Login</button>
          </form>
        </div>
        <p className="signup-container">
          Don`&apos;`t have an Account?
          <br />
          <span className="line">
            {/* Put router link here */}
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
