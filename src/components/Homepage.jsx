import uicLogo from "../assets/uic-logo.png";
import verticalLine from "../assets/vertical-line.png";
import sidelineHeader from "../assets/sideline-firstfloor.png";
import profileIcon from "../assets/profile-icon.png";
import filterIcon from "../assets/filter-icon.png";
import schoolBG from "../assets/school-bg.png";

//CSS
import "../styles/homepage.css";
const Homepage = () => {
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
              <a href="#">ABOUT</a>
            </li>
            <li>
              <a href="#">ROOMS</a>
            </li>
            <li>
              <a href="#">
                <img src={profileIcon} alt="Profile" className="profile-icon" />
              </a>
            </li>
          </ul>
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
              <button>ROOM 101</button>
              <button>ROOM 102</button>
              <button>ROOM 103</button>
              <button>ROOM 104</button>
              <button>ROOM 105</button>
              <button>ROOM 106</button>
              <button>ROOM 107</button>
              <button>ROOM 108</button>
              <button>ROOM 109</button>
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
              <button>LAB 201</button>
              <button>LAB 202</button>
              <button>LAB 203</button>
              <button>LAB 204</button>
              <button>LAB 205</button>
              <button>LAB IOT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
