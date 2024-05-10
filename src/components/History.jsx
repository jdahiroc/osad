//images imports
import uicLogo from "../assets/uic-logo.png";
import verticalLine from "../assets/vertical-line.png";
import profileIcon from "../assets/profile-icon-admin2.png";
import eyeIcon from "../assets/Eye.png";
import schoolBG from "../assets/history-banner.png";
//CSS
import "../styles/history.css";
import CircularProgress from "@mui/material/CircularProgress";

//User Authentication
import { UserAuth } from "../context/AuthContext";
// Reach Hooks
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const History = () => {
  // useStates hooks
  const [modal, setModal] = useState(false);
  const [profileIcons, setProfileIcon] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  // loading state
  const [loading, setLoading] = useState(true);

  // // Modal Function
  const toggleModal = (item) => {
    setSelectedItem(item);
    setModal(!modal);
  };
  // profile icon modal
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

  //get the history real-time data from db
  const getHistoryData = () => {
    const unsub = onSnapshot(
      collection(db, "history"),
      (snapShot) => {
        const Data = [];
        snapShot.docs.forEach((doc) => {
          Data.push({ id: doc.id, ...doc.data() });
        });
        setHistoryData(Data);
        setLoading(false); // Set loading state to false
      },
      (error) => {
        console.log("Error fetching data: ", error);
        setLoading(false); // Set loading state to false in case of error
      }
    );

    return () => {
      unsub();
    };
  };

  useEffect(() => {
    getHistoryData();
  }, []);

  // Render loading state if data is loading
  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

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
              <span className="profile-icon" onClick={toggleProfileModal}>
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
          <span>MAIN CAMPUS</span>
        </div>
      </div>
      <div className="hr-line-container">
        <hr className="hr-line" />
      </div>

      {/* <!-- Table with Additional Label Text --> */}
      <table className="additional-labels">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Room Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {/* If data is empty */}
          {historyData.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-table-message">
                No data available
              </td>
            </tr>
          ) : (
            // Renders the data by mapping all data
            historyData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.roomName}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => toggleModal(item)}
                    className="show-info"
                  >
                    <img src={eyeIcon} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* <!-- Modal --> */}
      <div id="detailsModal" className={`overlay ${modal ? "show" : ""}`}>
        <div className="modal-content">
          {/* <!-- Add modal content here --> */}
          <span onClick={toggleModal} className="close">
            &times;
          </span>
          {selectedItem && (
            <>
              <h2>{selectedItem.userName}&apos;s History</h2>
              <hr />
              <div className="info-container">
                <div className="left-column">
                  <p>
                    <strong>Room Name: </strong> {selectedItem.roomName}
                  </p>
                  <p>
                    <strong>Type: </strong> {selectedItem.roomType}
                  </p>
                  <p>
                    <strong>Date: </strong> {selectedItem.date}
                  </p>
                  <p>
                    <strong>Time: </strong> {selectedItem.time}
                  </p>
                </div>
                <div className="right-column">
                  <p>
                    <strong>Account Name: </strong> {selectedItem.userName}
                  </p>
                  <p>
                    <strong>Email: </strong> {selectedItem.email}
                  </p>
                  <p className="right-align">
                    <strong>Attachments: </strong>
                    <button
                      onClick={() =>
                        window.open(selectedItem.attachments, "_blank")
                      }
                    >
                      Open file
                    </button>
                  </p>
                  <p>
                    <strong>Status: </strong> {selectedItem.status}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
