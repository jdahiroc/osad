import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import uicLogo from "../assets/uic-logo.png";
import verticalLine from "../assets/vertical-line.png";
import profileIcon from "../assets/profile-icon-admin2.png";
import sidelineHeader from "../assets/sideline-firstfloor.png";
import filterIcon from "../assets/filter-icon.png";
import schoolBG from "../assets/school-bg.png";

import { UserAuth } from "../context/AuthContext";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "../styles/homepage.css";

const Homepage = () => {
  const [modal, setModal] = useState(false);
  const [rooms, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [profileIcons, setProfileIcon] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleProfileModal = () => {
    setProfileIcon(!profileIcons);
  };

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/rooms", {
      state: {
        selectedRoom: selectedRoom,
        roomType: selectedRoom.roomType,
        roomName: selectedRoom.roomName,
      },
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out!");
    } catch (e) {
      console.log(e.message);
    }
  };

  // read room floors real-time
  const getRoom = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "mainCampus"));
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoom(roomsData);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <>
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
              <ScrollLink to="rooms" smooth={true} duration={500}>
                <span>ROOMS</span>
              </ScrollLink>
            </li>
            <li>
              <span className="profile-icon" onClick={toggleProfileModal}>
                <img src={profileIcon} alt="Profile" className="profile-icon" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={`overlay-profileIcon  ${profileIcons ? "show" : "hide"}`}>
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

      <div className="wide-image">
        <img src={schoolBG} alt="School Background" loading="lazy" />
      </div>

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
          </div>
        </div>

        <div className="second-floor-container">
          <div id="rooms" className="second-floor-header">
            <img src={sidelineHeader} alt="Sideline Header" />
            <h3>SECOND FLOOR</h3>
          </div>
          <div className="second-floor-buttons-container">
            {loading ? (
              <div className="loading">
                <Box>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              rooms.map((room) => (
                <div className="second-floor-button1" key={room.id}>
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      toggleModal();
                    }}
                    className="btn-modal"
                  >
                    {room.roomName}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`overlay ${modal ? "show" : "hide"}`}>
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <div className="modal-header">
            <img src={sidelineHeader} alt="Sideline Header" />
            <h2>ROOM INFORMATION</h2>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="info-item col-md-4">
                  <label htmlFor="room-name">Room Name:</label>
                  <p>{selectedRoom && selectedRoom.roomName}</p>
                </div>
                <div className="info-item col-md-4">
                  <label htmlFor="room-type">Room Type:</label>
                  <p>{selectedRoom && selectedRoom.roomType}</p>
                </div>
                <div className="info-item">
                  <label htmlFor="room-location">Location:</label> <br />
                  <span>{selectedRoom && selectedRoom.location}</span>
                </div>
                <div className="modal-footer">
                  <button onClick={handleBookNow}>BOOK NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
