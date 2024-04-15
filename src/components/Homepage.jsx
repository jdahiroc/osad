import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import uicLogo from "../assets/uic-logo.png";
import verticalLine from "../assets/vertical-line.png";
import profileIcon from "../assets/profile-icon-admin2.png";
import sidelineHeader from "../assets/sideline-firstfloor.png";
import filterIcon from "../assets/filter-icon.png";
import schoolBG from "../assets/school-bg.png";
import "../styles/homepage.css";
import { UserAuth } from "../context/AuthContext";

const Homepage = () => {
  const [modal, setModal] = useState(false);
  // const [fullName, setFullName] = useState("");
  const [rooms, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [profileIcons, setProfileIcon] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleProfileModal = () => {
    setProfileIcon(!profileIcons);
  };

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  //logout function
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out!");
    } catch (e) {
      console.log(e.message);
    }
  };

  // const getFullNameUser = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   const fullNames = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     fullName: doc.data().fullName,
  //   }));
  //   setFullName(fullNames);
  // };

  const getRoom = async () => {
    const querySnapshot = await getDocs(collection(db, "mainCampus"));
    const roomsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRoom(roomsData);
  };

  useEffect(() => {
    // getFullNameUser();
    getRoom();
  }, []);

  return (
    <>
      {/* Navigation */}
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
          {/* {fullName ? (
            fullName.map((userName) => (
              <div className="userName-container" key={userName.id}>
                <h3>{userName.fullName}</h3>
              </div>
            ))
          ) : (
            <span></span>
          )} */}
          <div className="userName-container">
            <h3>{user.fullName}</h3>
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

      {/* UIC IMAGE */}
      <div className="wide-image">
        <img src={schoolBG} alt="School Background" />
      </div>

      {/* CONTENTS */}
      <div className="content-container">
        {/* Campus Navigation */}
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

        {/* Second Floor */}
        <div className="second-floor-container">
          <div className="second-floor-header">
            <img src={sidelineHeader} alt="Sideline Header" />
            <h3>SECOND FLOOR</h3>
          </div>
          <div className="second-floor-buttons-container">
            {rooms ? (
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
            ) : (
              <h2>LOADING...</h2>
            )}
          </div>
        </div>

        {/* Room Information Modal */}
        <div id="modal" className={`overlay ${modal ? "show" : ""}`}>
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
                  <Link to="/rooms">
                    <button>BOOK NOW</button>
                  </Link>
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
