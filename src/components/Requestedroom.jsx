//images imports
import uicLogo from "../assets/uic-logo.png";
import verticalLine from "../assets/vertical-line.png";
import profileIcon from "../assets/profile-icon-admin2.png";
import schoolBG from "../assets/request-banner.png";
import acceptIcon from "../assets/Done.png";
import eyeIcon from "../assets/Eye.png";
import declineIcon from "../assets/Close.png";
//CSS
import "../styles/requestedroom.css";

//User Authentication
import { UserAuth } from "../context/AuthContext";
// Reach Hooks
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Requestedroom = () => {
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
              <Link to="/a/request">
                <span>REQUESTS</span>
              </Link>
            </li>
            <li>
              <Link to="/a/history">
                <span>HISTORY</span>
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
      <div className={`overlay-profileIcon ${profileIcons ? "show" : ""}`}>
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

      {/* <!--------Image-------> */}
      <div className="wide-image">
        <img src={schoolBG} alt="School Background" />
      </div>

      {/* <!--------Filter Campus-------> */}
      <div className="container">
        <img
          className="filter-icon"
          src="images/filter-icon.png"
          alt="Filter Icon"
        />
        <div className="filter-text">
          <span>ALL</span>
          <span>MAIN CAMPUS</span>
          <span>ANNEX CAMPUS</span>
        </div>
      </div>
      <div className="hr-line-container">
        <hr className="hr-line" />
      </div>

      {/* <!-- Table with Additional Label Text --> */}
      <table className="additional-labels">
        <tr>
          <th>Date</th>
          <th>Room Name</th>
          <th>ID</th>
          <th>Campus</th>
          <th></th>
        </tr>

        <tr
          className="table-row"
          data-toggle="modal"
          data-target="#detailsModal"
        >
          <td>03/30/2024</td>
          <td>L201</td>
          <td>210000000217</td>
          <td>Main Campus</td>
          <td>
            <button onClick={toggleModal} className="show-info">
              <img src={eyeIcon} />
            </button>
            <button className="accept">
              <img src={acceptIcon} />
              Accept
            </button>
            <button className="delete">
              <img src={declineIcon} />
              Delete
            </button>
          </td>
        </tr>
        <tr
          className="table-row"
          data-toggle="modal"
          data-target="#detailsModal"
          onClick={toggleModal}
        >
          <td>03/30/2024</td>
          <td>L201</td>
          <td>210000000217</td>
          <td>Main Campus</td>
          <td>
            <button onClick={toggleModal} className="show-info">
              <img src={eyeIcon} />
            </button>
            <button className="accept">
              <img src={acceptIcon} />
              Accept
            </button>
            <button className="delete">
              <img src={declineIcon} />
              Delete
            </button>
          </td>
        </tr>
      </table>

      {/* <!-- Modal --> */}
      <div id="detailsModal" className={`overlay ${modal ? "show" : ""}`}>
        <div className="modal-content">
          {/* <!-- Add modal content here --> */}
          <span onClick={toggleModal} className="close">
            &times;
          </span>
          <h2>USER HISTORY</h2>
          <hr />
          <div className="info-container">
            <div className="left-column">
              <p>
                <strong>Room Name: JUSTIN DAVE</strong>
              </p>
              <p>
                <strong>Type:</strong>
              </p>
              <p>
                <strong>Date:</strong>
              </p>
              <p>
                <strong>Time Slot:</strong>
              </p>
            </div>
            <div className="right-column">
              <p>
                <strong>Status: HAPPY BIRTHDAY PO</strong>
              </p>
              <p>
                <strong>Account Name:</strong>
              </p>
              <p>
                <strong>ID:</strong>
              </p>
              <p className="right-align">
                <strong>Request Form:</strong>
                <input type="file" id="fileInput" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requestedroom;
