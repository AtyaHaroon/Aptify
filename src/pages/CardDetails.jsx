import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CardDetails = () => {
  const { id } = useParams();
  const [aptitude, setAptitude] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); // For navigation when Apply is clicked
  const today = new Date(); // Get today's date

  useEffect(() => {
    const fetchAptitudeDetails = async () => {
      try {
        const response = await fetch(
          `https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAptitude(data);
        }
      } catch (error) {
        console.error("Error fetching aptitude details:", error);
      }
    };

    fetchAptitudeDetails();

    // Fetch user data from localStorage (assuming it's stored when user logs in)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setUserName(storedUser.name);
    }
  }, [id]);

  const handleApplyClick = () => {
    if (userName) {
      // If user is logged in, redirect to the apply page with aptitude name
      navigate(`/apply?userName=${userName}&aptitudeName=${aptitude.name}`);
    } else {
      // If not logged in, redirect to login page
      navigate("/login");
    }
  };

  if (!aptitude) return <p>Loading...</p>;

  // Check if aptitude date is in the past
  const aptitudeDate = new Date(aptitude.date); // Ensure that aptitude.date is a valid date string
  const isPastDate = aptitudeDate < today; // Compare aptitude date with today's date

  return (
    <>
      <section>
        <center>
          <div className="container mt-5">
            <div className="col-9">
              <div
                className="card mb-3 shadow-lg"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="card-header text-center  bg-transparent fs-4 fw-bold">
                  <span className="text-uppercase co">
                    <u>{aptitude.name} Details</u>
                  </span>
                </div>
                <div className="row mt-3 d-flex align-items-center">
                  <div className="col-5 ms-4 mt-2 text-center">
                    <img
                      src="/assets/images/topics/undraw_Educator_re_ju47.png" // Ensure this path is correct
                      alt="Aptitude Test"
                      className="img-fluid  mb-4"
                    />
                  </div>
                  <div className="col-6 text-center ">
                    <p className="card-text co fs-5 fw-semi-bold">
                      <span className="co ">{aptitude.desc}</span>
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-transparent text-center co fs-5 fw-semibold ">
                  Last Date: <span className="fw-normal co">{aptitude.date}</span>
                </div>
              </div>

              {/* Apply Button */}
              <button
                style={{
                  backgroundColor: "transparent", // Outline buttons typically have no background
                  border: "2px solid #80d0c7", // Border color matches the background color you provided
                  color: "#80d0c7",
                  transition: "background-color 0.3s, color 0.3s",
                  padding: "10px 20px", // Padding for better appearance
                }}
                className={`btn co  btn-md mt-3 fs-5 ${
                  isPastDate ? "disabled" : ""
                }`} // Disable button if the date is in the past
                disabled={isPastDate} // Button is disabled for past dates
                onClick={handleApplyClick} // Apply button action
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                  e.target.style.color = "#fff"; // Change text color to white
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                  e.target.style.color = "#80d0c7"; // Reset text color
                }}
              >
                {isPastDate ? "Application Closed" : "Apply"}
              </button>
            </div>
          </div>
        </center>
      </section>
    </>
  );
};

export default CardDetails;
