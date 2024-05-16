import uicLogo from "../assets/uic-logo.png";
import uicBanner from "../assets/uic-logo2.png";
import verticalLine from "../assets/vertical-line.png";
import sideLine from "../assets/sideline-firstfloor.png";
import profileIcon from "../assets/profile-icon.png";
import uploadIcon from "../assets/Upload.png";

//css link
import "../styles/rooms.css";

//User Authentication
import { UserAuth } from "../context/AuthContext";

// React Hooks
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

const Rooms = () => {
  const [profileIcons, setProfileIcon] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attachments, setAttachments] = useState("");
  const [attachmentFileName, setAttachmentFileName] = useState([]);

  const [open, setOpen] = useState("");

  useEffect(() => {
    const uploadFile = () => {};
    attachments && uploadFile();
  }, [attachments]);

  // User Authentication
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const toggleProfileModal = () => {
    setProfileIcon(!profileIcons);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/home"); // Navigate back to home after modal close
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Disabled submit button if form !filled
  const handleFormChange = () => {
    // Check if all form fields are filled
    if (attachments) {
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
  
    // Check if all required fields are filled
    if (!date || !startTime || !endTime || !attachments) {
      console.log("Please fill in all required fields");
      return;
    }

  
    const storageRef = ref(storage, attachments.name);
    const uploadTask = uploadBytesResumable(storageRef, attachments);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (e) => {
        console.log(e);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
        const newRequest = {
          roomName: roomName,
          roomType: roomType,
          email: email,
          userName: userName,
          date: date,
          startTime: startTime,
          endTime: endTime,
          attachments: downloadURL,
          requestedOn: serverTimestamp(),
          status: "PENDING",
        };
  
        try {
          await setDoc(doc(db, "requestedRoom", user.uid), newRequest);
          navigate("/home");
        } catch (e) {
          console.log(e.message);
        }
      }
    );
  };


  const location = useLocation();
  const { selectedRoom, roomType, roomName } = location.state || {};

  const email = user ? user.email : "";
  const userName = user ? user.displayName : "";

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date(0, 0, 0, hour, minute).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        );
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

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
                disabled
              />
            </h6>

            <h6>
              Type:
              <input
                id="roomType"
                type="text"
                defaultValue={selectedRoom && selectedRoom.roomType}
                disabled
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
              <div className="selectStartTime-container">
                <label className="starttime-text">Start Time:</label>
                <select
                  id="startTime"
                  name="startTime"
                  onChange={(e) => setStartTime(e.target.value)}
                  value={startTime}
                >
                  <option value="">Select Start Time</option>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <div className="selectEndTime-container">
                  <label className="endtime-text">End Time:</label>
                  <select
                    id="endTime"
                    name="endTime"
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime}
                  >
                    <option value="">Select End Time</option>
                    {timeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="bookerName-container">
            <h6>
              Account Name:
              <input
                id="userName"
                type="text"
                className="text-ellipsis"
                defaultValue={user && user.displayName}
                disabled
              />
            </h6>
            <h6>
              Email:
              <input
                id="email"
                type="text"
                className="text-ellipsis"
                defaultValue={user && user.email}
                disabled
              />
            </h6>
          </div>
          <div className="attachment-container">
            <p>Attach Request Form:</p>
            <input
              type="file"
              onChange={(e) => {
                setAttachments(e.target.files[0]);
                setAttachmentFileName(e.target.files[0].name); // Set the file name
              }}
              id="uploadBtn"
            />
            <label className="uploadLabel" htmlFor="uploadBtn">
              <img src={uploadIcon} alt="Upload Icon" />
              Upload
            </label>
            {attachmentFileName && <span>{attachmentFileName}</span>}
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
                onClick={handleOpen}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* MODAL */}
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className="modal-alert-accepted"
              height={150}
              width={400}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              p={3}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Your request has been sent! Wait for approval!
              </Typography>
              <Button onClick={handleClose}>OK</Button>
            </Box>
          </Modal>
        </Backdrop>
      </div>
    </>
  );
};

export default Rooms;
