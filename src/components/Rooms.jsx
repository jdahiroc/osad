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
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Rooms = () => {
  const [modal, setModal] = useState(false);
  const [profileIcons, setProfileIcon] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [attachments, setAttachments] = useState("");

  // User Authentication
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  //close the modal function
  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleProfileModal = () => {
    setProfileIcon(!profileIcons);
  };

  // Disabled submit button if form !filled
  const handleFormChange = () => {
    // Check if all form fields are filled
    if (date && attachments) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  //Logout Function
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out!");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //converts the time format to 12hours
    const timeFormatted = new Date(date + "T" + time).toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    );

    const newRequest = {
      roomName: roomName,
      roomType: roomType,
      email,
      userName,
      date,
      time: timeFormatted,
      attachments,
      requestedOn: serverTimestamp(),
    };

    try {
      //
      await setDoc(doc(db, "requestedRoom", user.uid), newRequest);
      return alert("Request Sent!");
    } catch (e) {
      console.log(e.message);
    }
  };

  // Get the selected roomName, roomType from Homepage.jsx
  const location = useLocation();
  const { selectedRoom, roomType, roomName } = location.state || {};

  // Get user data from authentication context
  const email = user ? user.email : "";
  const userName = user ? user.displayName : "";

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
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          <div className="bookContent-header-container">
            <h3>BOOKING INFORMATION</h3>
            <div className="bookContent-underline"></div>
          </div>
          {/* left section */}
          <div className="room-info">
            <h6>
              Room Name:
              <input
                id="roomName"
                type="text"
                defaultValue={selectedRoom && selectedRoom.roomName}
              />
            </h6>

            <h6>
              Type:
              <input
                id="roomType"
                type="text"
                defaultValue={selectedRoom && selectedRoom.roomType}
              />
            </h6>
          </div>
          <div className="dateAndTime-container">
            <p>Date and Time:</p>
            <div className="selectDateAndTime-container">
              <input
                id="date"
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                id="date"
                type="time"
                name="time"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          {/* right section */}
          <div className="bookerName-container">
            <h6>
              Account Name:
              <input
                id="userName"
                type="text"
                defaultValue={user && user.displayName}
              />
            </h6>
            <h6>
              Email:
              <input id="email" type="text" defaultValue={user && user.email} />
            </h6>
          </div>
          <div className="attachment-container">
            <p>Attach Request Form:</p>
            <input
              type="file"
              onChange={(e) => setAttachments(e.target.value)}
            />
          </div>
          <div className="bookingButtons-container">
            <div className="cancel-button">
              <Link to="/home">
                <button className="cancel">CANCEL</button>
              </Link>
            </div>
            <div className="bookNow-button">
              <button
                className={formFilled ? "" : "disabled"}
                disabled={!formFilled}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Rooms;
