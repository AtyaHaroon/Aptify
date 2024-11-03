import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap"; // Import Bootstrap Modal

const Quiz = () => {
  const [testDetails, setTestDetails] = useState(null);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // Track user's answers
  const [showResultModal, setShowResultModal] = useState(false); // Modal state
  const [result, setResult] = useState({}); // Result state

  useEffect(() => {
    const selectedTest = JSON.parse(localStorage.getItem("selectedTest"));
    if (selectedTest) {
      setTestDetails(selectedTest);
    } else {
      navigate("/test");
    }

    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          "https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/Question"
        );
        if (response.status === 200) {
          const data = await response.json();
          setQuestions(data.slice(0, 10)); // Get the first 10 questions
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [navigate]);

  // Handle the selection of an answer
  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correctCount += 1; // Count correct answers
      } else {
        wrongCount += 1; // Count wrong answers
      }
    });

    const totalQuestions = questions.length;
    const totalMarksObtained = correctCount * 2; // Each correct answer is worth 2 marks
    const totalMarks = totalQuestions * 2; // Total marks possible
    const percentage = ((correctCount / totalQuestions) * 100).toFixed(2); // Calculate percentage

    // Prepare the result data to be posted
    const resultData = {
      user_name: testDetails.user_name,
      apt_name: testDetails.apt_name,
      correct_ans: correctCount,
      wrong_ans: wrongCount,
      obtained_marks: totalMarksObtained,
      percentage,
    };

    try {
      // POST request to save the result to the mock API
      const response = await fetch(
        "https://670ad43aac6860a6c2ca9f75.mockapi.io/Aptify/results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultData),
        }
      );

      if (response.ok) {
        console.log("Result saved successfully!");
        // Save the test result in localStorage
        localStorage.setItem("testResult", JSON.stringify(resultData)); // Ensure this line is included

        // Set the result state for modal display
        setResult({
          correctCount,
          wrongCount,
          totalMarksObtained,
          totalMarks,
          percentage,
        });

        setShowResultModal(true); // Show the result modal
      } else {
        console.error("Failed to save result.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to close the modal and clear user answers
  const handleCloseModal = () => {
    setShowResultModal(false);
    setUserAnswers({}); // Clear user answers

    // Navigate to the profile page
    navigate("/profile");
  };

  return (
    <div className="container border border-3 quiz-container mt-5">
      <div className="alert alert-info text-center fs-6 co" role="alert">
        Note: Each correct answer contains 2 marks.
      </div>
      {testDetails ? (
        <>
          <h2 className="text-center mb-4 co">
            <u>{testDetails.apt_name}</u>
          </h2>
          <p className="text-center mb-4">
            Welcome,{" "}
            <strong className="text-capitalize co">
              {testDetails.user_name}!{" "}
            </strong>
            Get ready for the {testDetails.apt_name} test.
          </p>

          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={question.id} className="mb-4">
                <p>
                  {index + 1} - {question.question}
                </p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${index}`} // Unique name for each question
                    id={`q${index}-optA`} // Unique id for each option
                    value={question.opt_A}
                    onChange={() => handleAnswerChange(index, question.opt_A)} // Update the answer
                    required
                  />
                  <option
                    className="form-check-label"
                    htmlFor={`q${index}-optA`}
                  >
                    {question.opt_A}
                  </option>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${index}`}
                    id={`q${index}-optB`}
                    value={question.opt_B}
                    onChange={() => handleAnswerChange(index, question.opt_B)} // Update the answer
                    required
                  />
                  <option
                    className="form-check-label"
                    htmlFor={`q${index}-optB`}
                  >
                    {question.opt_B}
                  </option>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${index}`}
                    id={`q${index}-optC`}
                    value={question.opt_C}
                    onChange={() => handleAnswerChange(index, question.opt_C)} // Update the answer
                    required
                  />
                  <option
                    className="form-check-label"
                    htmlFor={`q${index}-optC`}
                  >
                    {question.opt_C}
                  </option>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${index}`}
                    id={`q${index}-optD`}
                    value={question.opt_D}
                    onChange={() => handleAnswerChange(index, question.opt_D)} // Update the answer
                    required
                  />
                  <option
                    className="form-check-label"
                    htmlFor={`q${index}-optD`}
                  >
                    {question.opt_D}
                  </option>
                </div>
              </div>
            ))}

            <button
              style={{
                backgroundColor: "transparent", // Initially transparent background for outline effect
                border: "2px solid #80d0c7", // Border color matches the original background color
                color: "#80d0c7", // Text color matches the border color
                transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effect
              }}
              type="submit"
              className="btn  mt-3 w-100"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                e.target.style.color = "#fff"; // Change text color to white
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                e.target.style.color = "#80d0c7"; // Reset text color
              }}
            >
              Submit
            </button>
          </form>

          {/* Bootstrap Modal for Results */}
          <Modal
            show={showResultModal}
            onHide={handleCloseModal}
            dialogClassName="modal-dialog-centered"
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 fs-3 fw-bolder co">
                <u> Result </u>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5 className="text-capitalize co fs-4 text-center">
                <u>
                  {testDetails.user_name} Your {testDetails.apt_name} Test
                  Result
                </u>
              </h5>
              <div className="row ms-2 ">
                <p className="col-6 co">
                  Correct Answers : {result.correctCount}
                </p>
                <p className="col-6 co">Wrong Answers : {result.wrongCount}</p>
              </div>
              <div className="row  ms-2 ">
                <p className="col-6 co">
                  Obtained Marks :{result.totalMarksObtained}
                </p>
                <p className="col-6 co">Total Marks : {result.totalMarks}</p>
              </div>

              <p className="text-center co">Percentage: {result.percentage}%</p>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </Link>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p className="text-center">Loading test details...</p>
      )}
    </div>
  );
};

export default Quiz;
