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
import CircularProgress from "@mui/material/CircularProgress";

//User Authentication
import { UserAuth } from "../context/AuthContext";

// Reach Hooks
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Requestedroom = () => {
  // useStates
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // loading state
  const [loading, setLoading] = useState(true);

  // Modal Function
  const [modal, setModal] = useState(false);
  const toggleModal = (item) => {
    setSelectedItem(item); // Set the selected item
    setModal(!modal); // Toggle the modal
  };

  // profile icon modal
  const [profileIcons, setProfileIcon] = useState(false);
  const toggleProfileModal = () => {
    setProfileIcon(!profileIcons);
  };

  //Logout Function
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  //Logout Function
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setLoading(false); // Set loading state to false
      console.log("You are logged out!");
    } catch (e) {
      console.log(e.message);
      setLoading(false); // Set loading state to false
    }
  };

  //handle Accept Function
  const handleAccept = async (id) => {
    try {
      // Fetch the accepted item
      const acceptedItem = data.find((item) => item.id === id);

      // Update the status to "approved"
      acceptedItem.status = "APPROVED";

      // Add the accepted item to the history collection
      await addDoc(collection(db, "history"), acceptedItem);
      await deleteDoc(doc(db, "requestedRoom", id));

      alert("Book Request has been approved. Already sent to user!");

      // Remove the accepted item from the data state
      setData(data.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  //handle Delete Function
  const handleDelete = async (id) => {
    try {
      // Fetch the accepted item
      const acceptedItem = data.find((item) => item.id === id);

      // Update the status to "approved"
      acceptedItem.status = "DECLINED";
      await deleteDoc(doc(db, "requestedRoom", id));
      // Add the accepted item to the history collection
      await addDoc(collection(db, "history"), acceptedItem);
      setData(data.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  }

  //get the request real-time data from db
  const getRequestData = () => {
    const unsub = onSnapshot(
      collection(db, "requestedRoom"),
      (snapShot) => {
        const requestData = [];
        snapShot.docs.forEach((doc) => {
          requestData.push({ id: doc.id, ...doc.data() });
        });
        setData(requestData); // Set the data state
        setLoading(false); // Set loading state to false
      },
      (error) => {
        console.log("Error fetching data: ", error);
        setLoading(false); // Set loading state to false
      }
    );

    return () => {
      unsub();
    };
  };

  useEffect(() => {
    getRequestData();
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
          <span>MAIN CAMPUS</span>
        </div>
      </div>
      <div className="hr-line-container">
        <hr className="hr-line" />
      </div>

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
          {/* If data is not available/empty */}
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-table-message">
                No data available
              </td>
            </tr>
          ) : (
            // Renders the data by mapping all data
            data.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.roomName}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td className="request-fetch-data">{item.status}</td>
                <td>
                  <button
                    onClick={() => toggleModal(item)}
                    className="show-info"
                  >
                    <img src={eyeIcon} alt="View" />
                  </button>
                  <button
                    onClick={() => handleAccept(item.id)}
                    className="accept"
                  >
                    <img src={acceptIcon} alt="Accept" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete"
                  >
                    <img src={declineIcon} alt="Delete" />
                    Decline
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* <!-- Show Icon Modal --> */}
      <div className={`overlay ${modal ? "show" : ""}`}>
        <div className="modal-content">
          <span onClick={toggleModal} className="close">
            &times;
          </span>
          {/* Renders the mapped selected item */}
          {selectedItem && (
            <>
              <h2>Request Information</h2>
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
                    <strong>Status:</strong>
                    <p className="request-status">{selectedItem.status}</p>
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

export default Requestedroom;
