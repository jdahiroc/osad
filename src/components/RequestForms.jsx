// import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";

import "../styles/request-styles.css";
import uiclogo from "../assets/uicLogo.png";
import browseicon from "../assets/browse-icon.png";
import bookicon from "../assets/book-icon.png";

const RequestForms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleSideBar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav
        className={`sidebar ${isNavOpen ? "show-sidebar" : "close-sidebar"}`}
      >
        <button
          id="close-sidebar"
          className="close-button"
          onClick={toggleSideBar}
        >
          &times;
        </button>
        <div>
          <img src={uiclogo} alt="Logo Description" />
        </div>
        <ul>
          <li>
            <div className="nav-item">
              <Link to="/dashboard">
                <img
                  src={browseicon}
                  alt="Room Icon"
                  className="nav-icon"
                  id="nav-search-icon"
                />
                <br />
                <p>Browse Room</p>
              </Link>
            </div>
          </li>
          <li>
            <div className="nav-item">
              <Link to="/requestforms">
                <img src={bookicon} alt="Request Icon" className="nav-icon" />
                <br />
                <p>Book a Room</p>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <header>
        <button
          id="sidebar-toggle"
          className="hamburger-button"
          onClick={toggleSideBar}
        >
          &#9776;
        </button>

        {/* INSERT SYSTEM LOGO */}

        <div className="header-buttons">
          <Link to="/login">
            <button className="logout-button">Logout</button>
          </Link>
        </div>
      </header>

      <div className="container">
        <div className="booking-form">
          <div className="room-info">
            <div className="info-container">
              <h2>Bookers Information</h2>
              <br />
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="id-number">ID Number:</label>
                <input type="text" id="id-number" name="id-number" required />
              </div>
              <div className="form-group">
                <label htmlFor="id-number">Course & Section:</label>
                <input type="text" id="id-number" name="id-number" required />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date of Request:</label>
                <input type="date" id="date" name="date" required />
              </div>

              <div className="reason-container">
                <br />
                <h2>Reason</h2>
                <div className="form-group">
                  <textarea
                    id="booking-reason"
                    name="booking-reason"
                    rows="6"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Submit button --> */}
          <button type="submit">Book Now</button>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Booking System Inc.</p>
      </footer>
    </>
  );
};

export default RequestForms;
