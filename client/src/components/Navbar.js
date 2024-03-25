import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal"; // Import Modal component
import Calendar from "./calendar"; // Import Calendar component

const Navbar = () => {
  const [cookies, , removeCookie] = useCookies(["Email", "AuthToken"]); // Destructure only necessary methods
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload(); // This will refresh the page
  };

  const toggleCalendar = () => {
    setShowCalendar((prevShowCalendar) => !prevShowCalendar); // Use functional update for state toggling
  };

  return (
    <div className="navbar">
      <nav>
        <h3 className="title">RecipeBook</h3>
        <ul>
          <li>
            <button className="signout" onClick={toggleCalendar}>
              {"CALENDAR"}
            </button>
          </li>
          <li>
            <button className="signout" onClick={signOut}>
              SIGN OUT
            </button>
          </li>
        </ul>
      </nav>
      {showCalendar && <Calendar setShowCalendar={setShowCalendar} />} {/* Pass setShowCalendar correctly */}
    </div>
  );
};

export default Navbar;
