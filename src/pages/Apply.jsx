import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Apply = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userName = queryParams.get("userName");
  const aptitudeName = queryParams.get("aptitudeName");
  const shortDesc = queryParams.get("shortDesc"); // Get short_desc from the query parameters

  // State to hold the user's percentage
  const [Percentage, setPercentage] = useState("");

  const [ErrorMessage, setErrorMessage] = useState(""); // State for the error message
  const [SuccessMessage, setSuccessMessage] = useState(""); // State for the Success message

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert percentage input to a number
    const parsedPercentage = parseFloat(Percentage);

    // Check if percentage is a valid number
    if (isNaN(parsedPercentage) || parsedPercentage < 0) {
      setErrorMessage("Please enter a valid percentage.");
      setSuccessMessage("");
      return;
    }

    // Eligibility conditions
    let isEligible = true; // Track eligibility status
    if (aptitudeName === "MCAT" || aptitudeName === "ECAT") {
      if (parsedPercentage < 80) {
        setErrorMessage("You are not eligible to apply for this test.");
        setSuccessMessage("");
        isEligible = false;
      }
    } else if (aptitudeName === "GMAT" || aptitudeName === "GRE") {
      if (parsedPercentage < 65) {
        setErrorMessage("You are not eligible to apply for this test.");
        setSuccessMessage("");
        isEligible = false;
      }
    }

    // If the user is eligible, proceed to submit the application
    if (isEligible) {
      try {
        const userApply = {
          user_name: userName,
          apt_name: aptitudeName,
          percentage: Percentage,
          status: "pending", // Include status in the payload
          short_desc: shortDesc, // Include the short description in the payload
        };

        // Store application details in localStorage
        localStorage.setItem("applyDetails", JSON.stringify(userApply));

        const response = await fetch(
          "https://67046127ab8a8f892733b866.mockapi.io/Aptify/Apply",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userApply),
          }
        );
        if (response.status === 201) {
          setErrorMessage("");
          setSuccessMessage("Applied Successfully !!");
          setTimeout(() => {
            navigate("/test"); // Navigate to the test page after a successful application
          }, 1000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <section >
        <br />
        <br />
        <div className="border border-2 shadow-lg border-info-subtle container mt-5 mb-5 col-5" >
          <div className="row text-center mt-4">
            {ErrorMessage && (
              <div className="col-12 text-center">
                <p className="alert alert-danger">{ErrorMessage}</p>
              </div>
            )}
            {SuccessMessage && (
              <div className="col-12 text-center">
                <p className="alert alert-success">{SuccessMessage}</p>
              </div>
            )}
            <div className="col-md-6">
              <h5 className="text-uppercase co">Name: {userName}</h5>
            </div>
            <div className="col-md-6">
              <h5 className="text-uppercase co">Applied For: {aptitudeName}</h5>
            </div>
          </div>

          <form className="row g-3 mb-5" onSubmit={handleSubmit}>
            <center>
              <div className="col-md-6 mt-2 text-center">
                <input
                  type="text"
                  className="form-control"
                  id="inputPercentage"
                  placeholder="Enter your Percentage..."
                  value={Percentage}
                  onChange={(e) => setPercentage(e.target.value)} // Update percentage state
                />
              </div>
            </center>

            <div className="col-12 mt-4 ">
              <center>
                <button
                  style={{
                    backgroundColor: "transparent", // Initially transparent background for outline effect
                    border: "2px solid #80d0c7", // Border color matches the original background color
                    color: "#80d0c7", // Text color matches the border color
                    transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effect
                  }}
                  type="submit"
                  className="btn btn-lg  text-center"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                    e.target.style.color = "#fff"; // Change text color to white
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                    e.target.style.color = "#80d0c7"; // Reset text color
                  }}
                >
                  Apply
                </button>
              </center>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
      </section>
    </>
  );
};

export default Apply;
