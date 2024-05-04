import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getDocs, collection, query, where } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase";

// uic logo
import uicLogo from "../assets/logo.png";

// Styles
import "../styles/adminLogin.css";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, updateProfile } = UserAuth();

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
    setErrMsg(""); // Clear any previous error messages
    try {
      // Sign in the user
      await signIn(email, password);

      // Fetch full name from Firestore based on email
      const fullName = await fetchFullNameByEmail(email);

      // Update user profile with full name
      await updateProfile(fullName);

      navigate("/a/request");
    } catch (error) {
      console.error("Error signing in:", error); // Log the error for debugging
      setErrMsg("Failed to sign in. Please try again.");
    }
  };

  // Function to fetch full name from Firestore based on email
  const fetchFullNameByEmail = async (email) => {
    try {
      const usersRef = collection(db, "AdminUser");
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
      {/* error message */}
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
          <h1>ADMINISTRATOR</h1>
        </div>
        <div className="form-container-login">
          <form onSubmit={handleSubmit} onChange={handleFormChange}>
            <label htmlFor="studentId" className="labelstdID">
              Email
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
      </div>
    </>
  );
};

export default Login;
