import uicLogo from "../assets/uic-logo.png";
import uicBanner from "../assets/uic-logo2.png";
import verticalLine from "../assets/vertical-line.png";
import sideLine from "../assets/sideline-firstfloor.png";
import profileIcon from "../assets/profile-icon.png";

//css link
import "../styles/rooms.css";

//User Authentication
import { UserAuth } from "../context/AuthContext";

// Reach Hooks
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Rooms = () => {
  // Modal Function
  const [modal, setModal] = useState(false);
  //close the modal
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

  // Use location to access state passed as query parameters
  const location = useLocation();
  const selectedRoom = location.state && location.state.selectedRoom;


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

      {/* banner */}
      <div className="banner-container">
        <img className="uicBanner-img" src={uicBanner} alt="uic-banner" />
        <div className="text-banner-container">
          <img className="sideLine-img" src={sideLine} />
          <h3>BOOK ROOM</h3>
        </div>
      </div>

      {/* contents */}
      <div className="bookContent-container">
        <form>
          <div className="bookContent-header-container">
            <h3>BOOKING INFORMATION</h3>
            <div className="bookContent-underline"></div>
          </div>
          {/* left section */}
          <div className="room-info">
            <h6>
              Room Name: <span>{selectedRoom && selectedRoom.roomName}</span>
            </h6>
            <h6>
              Type: <span>{selectedRoom && selectedRoom.roomType}</span>
            </h6>
          </div>
          <div className="dateAndTime-container">
            <p>Date and Time:</p>
            <div className="selectDateAndTime-container">
              <input type="date" name="date" />
              <input type="time" />
            </div>
          </div>
          {/* right section */}
          <div className="bookerName-container">
            <h6>
              Account Name: <span>{user && user.displayName}</span>
            </h6>
            <h6>
              ID: <span>210000000217</span>
            </h6>
          </div>
          <div className="attachment-container">
            <p>Attach Request Form:</p>
            <input type="file" />
          </div>
          <div className="bookingButtons-container">
            <div className="cancel-button">
              <Link to="/home">
                <button className="cancel">CANCEL</button>
              </Link>
            </div>
            <div className="bookNow-button">
              <button>BOOK NOW</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Rooms;
