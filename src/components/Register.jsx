import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import uicLogo from "../assets/logo.png";
import "../styles/register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formFilled, setFormFilled] = useState(false);

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleFormChange = () => {
    // Check if all form fields are filled
    if (email && password && fullName && schoolId && confirmPassword) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  //------------------
  // Handle Submit
  //------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const newUser = {
      confirmPassword,
      email,
      fullName,
      password,
      schoolId,
      createdOn: serverTimestamp(),
    };

    // Add a new document with a generated id.
    try {
      // Create user in Firebase Authentication
      const authUserCredential = await createUser(email, password);
      const { user } = authUserCredential;

      // Set displayName in user object
      user.displayName = fullName;

      // Use UID as document ID in Firestore
      await setDoc(doc(db, "users", user.uid), newUser);
      navigate("/home");
    } catch (e) {
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
          <form onSubmit={handleSubmit} onChange={handleFormChange}>
            {/* Full Name */}
            <label htmlFor="fullname">Full Name</label>
            <br />
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name here"
              autoComplete="off"
              onChange={(e) => setFullName(e.target.value)}
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
              onChange={(e) => setSchoolId(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <p className="login-container">
              Already have an account?
              <br />
              <span className="line">
                {/* put router link here */}
                <Link to="/"> Login</Link>
              </span>
            </p>
            <button
              className={formFilled ? "" : "disabled"}
              disabled={!formFilled}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
