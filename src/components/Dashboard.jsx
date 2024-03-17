// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';


import uiclogo from "../assets/uicLogo.png";
import browseicon from "../assets/browse-icon.png";
import bookicon from "../assets/book-icon.png";

const Dashboard = () => {
  // User Auth
  const  { user, logout } = UserAuth();
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try { 
      await logout();
      navigate('/');
      console.log('You are logged out!')
    } catch (e) { 
      console.log(e.message);
    }
  }

  //Side Bar function
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleSideBar = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Opening Modal function
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

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

        {/* this will show the user email to verify the logged in account */}
        <p>User Email: {user && user.email}</p>

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
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="header-buttons-secondary">
        <button className="uic-main-button">UIC-MAIN</button>
      </div>

      <div className="centered-section">
        <div className="booking-container">
          <div className="floor-section">
            <h2>Floor 1</h2>
            <div className="button-grid">
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 101"
              >
                Room 101
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 102"
              >
                Room 102
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 103"
              >
                Room 103
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 104"
              >
                Room 104
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 105"
              >
                Room 105
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 106"
              >
                Room 106
              </button>
            </div>
          </div>

          <div className="floor-section">
            <h2>Floor 2</h2>
            <div className="button-grid">
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 201"
              >
                Room 201
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 202"
              >
                Room 202
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 203"
              >
                Room 203
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 204"
              >
                Room 204
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 205"
              >
                Room 205
              </button>
              <button
                onClick={toggleModal}
                className="room-button"
                data-room="Room 206"
              >
                Room 206
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Information Modal */}
      <div id="modal" className={`modal ${modal ? "modal-content" : "modal"}`}>
        <span className="close" onClick={toggleModal}>
          &times;
        </span>
        <div className="modal-header">
          <h2>Room Information</h2>
        </div>
        <div className="modal-body">
          <div className="info-item">
            <label htmlFor="room-name">Room Name:</label>
            <p id="room-name"></p>
          </div>
          <div className="info-item">
            <label htmlFor="room-location">Location:</label>
            <p id="room-location"></p>
          </div>

          <div className="info-item">
            <label htmlFor="available-time">Available Time:</label>
            <div className="available-time-list">
              <div className="available-time-item">7:00am - 8:00am</div>
              <div className="available-time-item">8:00am - 9:00am</div>
              <div className="available-time-item">9:00am - 10:00am</div>
              <div className="available-time-item">10:00am - 11:00am</div>
              <div className="available-time-item">11:00am - 12:00pm</div>
              <div className="available-time-item">1:00pm - 2:00pm</div>
              <div className="available-time-item">2:00pm - 3:00pm</div>
              <div className="available-time-item">3:00pm - 4:00pm</div>
              <div className="available-time-item">4:00pm - 5:00pm</div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Booking System Inc.</p>
      </footer>
    </>
  );
};

export default Dashboard;
