import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Alltest = () => {
  // State to hold the user's name
  const [userName, setUserName] = useState("");
  // State to hold aptitude data
  const [Aptitude, setAptitude] = useState([]);
  // Date filter
  const today = new Date();

  // Function to fetch aptitude data
  const fetchAptitude = async () => {
    try {
      const response = await fetch(
        "https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude"
      );
      if (response.ok) {
        const Aptitude_data = await response.json();
        setAptitude(Aptitude_data);
      }
    } catch (error) {
      console.error("Error fetching aptitude data:", error);
    }
  };

  // Function to handle user state updates based on localStorage
  const updateUserState = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setUserName(storedUser.name);
    } else {
      setUserName(""); // Clear username if logged out
    }
  };

  useEffect(() => {
    // Fetch user data from localStorage and aptitude data on mount
    updateUserState();
    fetchAptitude();

    // Set up listener for changes in localStorage (login/logout)
    const handleStorageChange = () => {
      updateUserState();
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Navigate hook for redirection
  const navigate = useNavigate();

  const handleApplyClick = (event, aptitudeName) => {
    event.preventDefault();

    // Find the selected aptitude by aptitudeName to extract the short_desc
    const selectedAptitude = Aptitude.find((apt) => apt.name === aptitudeName);
    const shortDesc = selectedAptitude ? selectedAptitude.short_desc : "";

    if (userName) {
      // Pass shortDesc in the URL parameters
      navigate(
        `/apply?userName=${userName}&aptitudeName=${aptitudeName}&shortDesc=${encodeURIComponent(
          shortDesc
        )}`
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="co fw-bold text-center ">
        <u>Aptitude Test List</u>
      </h2>
      <div className="row mt-3">
        {Aptitude.map((apt) => {
          // Parse the aptitude date
          const aptitudeDate = new Date(apt.date); // Ensure apt.date is in a valid format

          // Check if the aptitude date is less than today's date
          const isPastDate = aptitudeDate < today;

          return (
            <div className="mt-4 col-lg-4 col-md-6 col-12" key={apt.id}>
              <div className="custom-block bg-white shadow-lg">
                <div className="d-flex">
                  <div>
                    <h5 className="mb-2 co text-center">
                      <u>{apt.name}</u>
                    </h5>
                    <p className="mb-0 co text-center">{apt.short_desc}</p>
                  </div>
                </div>

                <img
                  src="assets/images/topics/undraw_Remote_design_team_re_urdx.png"
                  className="custom-block-image img-fluid"
                  alt=""
                />
                <div className="float-end mt-3">
                  <Link to={`/details/${apt.id}`}>
                    <button className="btn co btn-outline-secondary btn-md fs-5">
                      Details
                    </button>
                  </Link>
                  {/* Apply button with login condition */}
                  <button
                    style={{
                      backgroundColor: "transparent", // Outline buttons typically have no background
                      border: "3px solid #80d0c7", // Border color matches the background color you provided
                      color: "#80d0c7",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    className={`btn  co btn-md ms-2 fs-5 ${
                      isPastDate ? "disabled" : ""
                    }`}
                    disabled={isPastDate} // Disable button if date is past
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                      e.target.style.color = "#fff"; // Change text color to white
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                      e.target.style.color = "#80d0c7"; // Reset text color
                    }}
                    onClick={(event) => handleApplyClick(event, apt.name)} // Pass the aptitude name here
                  >
                    Apply
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-center co text-center">{apt.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alltest;
