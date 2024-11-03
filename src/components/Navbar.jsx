import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Initialize the user from localStorage
  const initialUserState = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser && storedUser.isLoggedIn
      ? storedUser
      : { isLoggedIn: false, name: "", id: "", isAdmin: false }; // Ensure all properties are included
  };

  const [User, setUser] = useState(initialUserState); // Set initial state based on localStorage
  const navigate = useNavigate(); // Hook for navigation

  // Fetch and update user data from localStorage on mount and on changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(
        updatedUser || { isLoggedIn: false, name: "", id: "", isAdmin: false }
      );
    };

    // Add an event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser({ isLoggedIn: false, name: "", id: "", isAdmin: false }); // Reset user state
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi-front"></i>
          <span className="ms-2">Aptify</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* Links for logged-in non-admin users */}
            {User.isLoggedIn && User.name !== "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/test">
                    Test
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/aptitude">
                    Aptitude Test
                  </Link>
                </li>
              </>
            )}
            {/* Links for guests */}
            {!User.isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/registration">
                    Registration
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Dropdown for logged-in users */}
          {User.isLoggedIn && (
            <div className="dropdown">
              <Link
                className="navbar-icon bi-person smoothscroll"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></Link>
              <ul
                className="dropdown-menu dropdown-menu-light"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <span className="dropdown-item">{User.name}</span>
                </li>
                {User.name !== "admin" && (
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Result
                    </Link>
                  </li>
                )}
                <li>
                  <Link className="dropdown-item" to={`/setting/${User.id}`}>
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
