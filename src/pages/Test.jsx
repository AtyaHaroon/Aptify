import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  // State to hold the tests information
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setLoggedInUser(storedUser);
    } else {
      // If no user is found, redirect to login or home page
      navigate("/login");
    }

    const fetchInfo = async () => {
      try {
        const response = await fetch(
          "https://67046127ab8a8f892733b866.mockapi.io/Aptify/Apply"
        );
        if (response.status === 200) {
          const infoData = await response.json();
          setInfo(infoData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInfo();
  }, [navigate]);

  // Function to handle starting the test
  const handleStartTest = (testDetails) => {
    // Save the test details in localStorage
    localStorage.setItem("selectedTest", JSON.stringify(testDetails));

    // Navigate to the test details page with the test ID or details
    navigate(`/quiz/${testDetails.id}`);
  };

  // Filter the applications for the logged-in user
  const filteredInfo = info.filter(
    (apply) => apply.user_name === loggedInUser?.name
  );

  return (
    <>
      <div className="container mt-5 ">
        <h2 className="co fw-bold text-center ">
          <u>Applied Test List</u>
        </h2>
        <div className="row g-4 mt-1 ">
          {filteredInfo.length > 0 ? (
            filteredInfo.map((apply) => (
              <div className="col-4" key={apply.id}>
                <div
                  className="card  mb-3 shadow-lg"
                  style={{ border: "2px solid #80d0c7" }}
                >
                  <div className="card-header text-center co bg-transparent fs-5 fw-bold ">
                    NAME:
                    <span className="text-uppercase "> {apply.user_name}</span>
                  </div>
                  <div className="fw-bold text-center fw-semi-bold mt-2 co">
                    <h4 className="card-title co  ">
                      <u>Applied For {apply.apt_name}</u>
                    </h4>
                    {/* Display the short description here */}
                    <p className="card-text m-1 co">
                      {apply.short_desc
                        ? apply.short_desc
                        : "No description available."}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent text-center co fs-5 fw-semibold ">
                    {apply.status === "Approved" ? (
                      <button
                        style={{ border: "3px solid #80d0c7" }}
                        className="btn  ms-2"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                          e.target.style.color = "#fff"; // Change text color to white
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                          e.target.style.color = "#80d0c7"; // Reset text color
                        }}
                        onClick={() => handleStartTest(apply)} // Handle test start click
                      >
                        Start Test
                      </button>
                    ) : apply.status === "pending" ||
                      apply.status === "Rejected" ? (
                      <>
                        <span className="text-capitalize co">STATUS : </span>
                        <span className="text-danger text-capitalize ms-1">
                          {apply.status}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No applications found for {loggedInUser?.name}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
