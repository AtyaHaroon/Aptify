import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [latestTestResult, setLatestTestResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);

      fetch(
        `https://670ad43aac6860a6c2ca9f75.mockapi.io/Aptify/results?user_name=${loggedInUser.name}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const sortedResults = data.sort((a, b) => b.id - a.id);
            setLatestTestResult(sortedResults[0]);
          }
        })
        .catch((error) => console.error("Error fetching test results:", error));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Calculate total marks based on the number of questions (defaulting to 10)
  const totalQuestions = latestTestResult?.total_questions || 10; // Default to 10 questions if not available
  const totalMarks = totalQuestions * 2; // Calculate total marks (2 marks per question)

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <section>
      <br />
      <div
        className="container col-7 mt-5 mb-5 p-4 shadow-lg"
        style={{
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <div className="row">
          {/* Profile section */}
          <div className="col-md-4 mt-3 mb-3">
            <div
              className="card text-center shadow-lg"
              style={{
                backgroundColor: "white",
                border: "1px solid #80d0c7",
                borderRadius: "15px",
              }}
            >
              <div className="card-body">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="Profile"
                  className="rounded-circle img-fluid mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "3px solid #80d0c7",
                  }}
                />
                <h5 className="card-title co text-capitalize">{user.name}</h5>
                <span className="co fs-6 fw-bold ">
                  Test Title : {latestTestResult?.apt_name || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Info section */}
          <div className="col-md-8">
            <h3 className="text-center co mt-4">
              <u>Result Information</u>
            </h3>
            <div className="mt-3">
              <div className="card-body">
                {latestTestResult ? (
                  <div className="row mb-2 mt-4 text-center">
                    <div className="col-md-6">
                      <p>
                        <strong>Correct Answers:</strong>{" "}
                        {latestTestResult.correct_ans}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Wrong Answers:</strong>{" "}
                        {latestTestResult.wrong_ans}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Obtained Marks:</strong>{" "}
                        {latestTestResult.obtained_marks}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Total Marks:</strong> {totalMarks || "N/A"}
                      </p>
                    </div>
                    <div className="col-md-12 text-center">
                      <p>
                        <strong>Percentage:</strong>{" "}
                        {latestTestResult.percentage}%
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>No test results available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
