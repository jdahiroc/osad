import uicLogo from "../assets/uic-logo.png";
import verticalLine from "../assets/vertical-line.png";
import profileIcon from "../assets/profile-icon-admin2.png";
import sidelineHeader from "../assets/sideline-firstfloor.png";
import filterIcon from "../assets/filter-icon.png";
import schoolBG from "../assets/school-bg.png";

//CSS
import "../styles/homepage.css";

//User Authentication
import { UserAuth } from "../context/AuthContext";

// Reach Hooks
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  // Modal Function
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  // profile icon modal
  const [profileIcons, setProfileIcon] = useState(false);
  const toggleProfileModal = () => {
    setProfileIcon(!profileIcons);
  };

  //Logout Function
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out!");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {/* <!-- NAVIGATION --> */}
      <div className="navigation">
        <div className="logo">
          <img src={uicLogo} alt="UIC Logo" />
        </div>
        <div className="line">
          <img src={verticalLine} alt="Line" />
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/home">
                <span>HOME</span>
              </Link>
            </li>
            <li>
              <Link to="/rooms">
                <span>ROOMS</span>
              </Link>
            </li>
            <li>
              <span onClick={toggleProfileModal}>
                <img src={profileIcon} alt="Profile" className="profile-icon" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Icon */}
      <div className={`overlay-profileIcon  ${profileIcons ? "show" : ""}`}>
        <div className="close-btn-container">
          <button onClick={toggleProfileModal} className="profile-closebtn">
            &times;
          </button>
        </div>
        <div className="profileIcon-modal-container">
          <div className="profile-icon-container">
            <img src={profileIcon} alt="profile-icon" />
          </div>
          <div className="userName-container">
            <h3>{user && user.displayName}</h3>
          </div>
          <div className="email-container">
            <p>{user && user.email}</p>
          </div>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* <!-- UIC IMAGE --> */}
      <div className="wide-image">
        <img src={schoolBG} alt="School Background" />
      </div>

      {/* CONTENTS */}
      <div className="content-container">
        <div className="campus-navigation-container">
          <div className="filter-icon">
            <a href="#">
              <img src={filterIcon} alt="filter-icon" />
            </a>
          </div>
          <div className="campus-navigation">
            <a href="#">MAIN CAMPUS</a>

            <div className="underline"></div>

            <a href="#">ANNEX CAMPUS</a>
          </div>
        </div>

        {/* First Floor */}
        <div className="first-floor-container">
          <div className="first-floor-header">
            <img src={sidelineHeader} />
            <h3>FIRST FLOOR</h3>
          </div>
          {/* First Floor Buttons */}
          <div className="first-floor-buttons-container">
            <div className="first-floor-button1">
              <button onClick={toggleModal} className="btn-modal">
                ROOM 101
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 102
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 103
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 104
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 105
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 106
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 107
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 108
              </button>
              <button onClick={toggleModal} className="btn-modal">
                ROOM 109
              </button>
            </div>
          </div>
        </div>

        {/* Second Floor */}
        <div className="second-floor-container">
          <div className="second-floor-header">
            <img src={sidelineHeader} />
            <h3>SECOND FLOOR</h3>
          </div>
          {/* second Floor Buttons */}
          <div className="second-floor-buttons-container">
            <div className="second-floor-button1">
              <button onClick={toggleModal} className="btn-modal">
                LAB 201
              </button>
              <button onClick={toggleModal} className="btn-modal">
                LAB 202
              </button>
              <button onClick={toggleModal} className="btn-modal">
                LAB 203
              </button>
              <button onClick={toggleModal} className="btn-modal">
                LAB 204
              </button>
              <button onClick={toggleModal} className="btn-modal">
                LAB 205
              </button>
              <button onClick={toggleModal} className="btn-modal">
                LAB IOT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Room Information Modal */}
      {/* BOOTSTRAP being used */}
      <div id="modal" className={`overlay ${modal ? "show" : ""}`}>
        <span className="close" onClick={toggleModal}>
          &times;
        </span>
        {/* MODAL HEADER */}
        <div className="modal-header">
          <img src={sidelineHeader} />
          <h2>ROOM INFORMATION</h2>
        </div>
        <div className="modal-body">
          <div className="container-fluid">
            <div className="row">
              {/* ROOM NAME */}
              <div className="info-item col-md-4">
                <label htmlFor="room-name">Room Name:</label>
                <p>ROOM 201</p>
              </div>
            </div>
            {/* ROOM TYPE */}
            <div className="info-item col-md-4">
              <label htmlFor="room-type">Room Type:</label>
              <p>LABORATORY ROOM</p>
            </div>
            {/* LOCATION */}
            <div className="info-item">
              <label htmlFor="room-location">Location:</label> <br />
              <span>
                Second Floor Right Wing Along side the Entrance Door Within the
                hallway, Across the Campus Server Room.
              </span>
            </div>
            {/* BOOK NOW */}
            <div className="modal-footer">
              <Link to="/rooms">
                <button>BOOK NOW</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
