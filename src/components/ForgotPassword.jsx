import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

// CSS
import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is valid
      if (!email) {
        throw new Error("Please enter a valid email address.");
      }

      // Send password reset email asynchronously
      await sendPasswordResetEmail(auth, email);

      // Notify the user that the email has been sent
      alert("Email has been sent. Please check your email!");

      // Navigate back to the login page after sending the link
      navigate("/a/login");
    } catch (error) {
      // Log the error for debugging
      console.error("Reset password error:", error);

      // Display an appropriate error message to the user
      alert(
        "An error occurred while sending the reset password link. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="forgotPassword-ccontainer">
        <div className="forgotPassword-container">
          <div className="forgotPassword-header-container">
            <h2>Forgot Password?</h2>
          </div>
          <div className="forgotPassword-container-form">
            <form onSubmit={handleSubmit}>
              <label>
                Please enter your email to send a forgot password link.
              </label>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button>Send</button>

              <Link to="/">
                <span className="cancel-button">Cancel</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
