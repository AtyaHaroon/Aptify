import React, { useEffect, useState } from "react";

const Showques = () => {
  const [Questions, setQuestions] = useState([]);
  const [CurrentQuestion, setCurrentQuestion] = useState(null); // For holding question to be updated
  const [UpdatedQuestion, setUpdatedQuestion] = useState({}); // For holding updated values
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const Response = await fetch(
          "https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/Question"
        );
        if (Response.status === 200) {
          const Questions_Data = await Response.json();
          setQuestions(Questions_Data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [Questions]);

  // Delete question
  const DeleteQuestion = async (id) => {
    try {
      const DeleteQuestion = await fetch(
        `https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/Question/${id}`,
        {
          method: "DELETE",
        }
      );
      if (DeleteQuestion.status === 200) {
        console.log(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Set the selected question for update and open modal
  const handleUpdateClick = (question) => {
    setCurrentQuestion(question); // Set the question to be updated
    setUpdatedQuestion(question); // Populate modal inputs with current values
    setShowModal(true); // Show modal
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    setUpdatedQuestion({ ...UpdatedQuestion, [e.target.name]: e.target.value });
  };

  // Update question
  const UpdateQuestion = async (id) => {
    try {
      const response = await fetch(
        `https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/Question/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(UpdatedQuestion),
        }
      );
      if (response.status === 200) {
        console.log("Question updated successfully");
        setShowModal(false); // Close modal after successful update
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className="container mt-4">
          <h2 className="text-center fw-bold mt-4 co">
            <u> Questions List </u>
          </h2>

          <table className=" table table-bordered mt-4 shadow-lg">
            <thead>
              <tr className="table-success">
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  #
                </th>
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Question
                </th>
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Option A
                </th>
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Option B
                </th>
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Option C
                </th>
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Option D
                </th>
                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Correct Option{" "}
                </th>

                <th
                  className="fs-5 fw-semi-bold co"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Questions.map((question, index) => {
                return (
                  <tr key={index}>
                    <th style={{ color: "#13547a" }} scope="row">
                      {question.id}
                    </th>
                    <td
                      className="fs-6 fw-normal co"
                      style={{ color: "#13547a" }}
                    >
                      {question.question}
                    </td>
                    <td
                      className="fs-6 fw-normal co"
                      style={{ color: "#13547a" }}
                    >
                      {question.opt_A}
                    </td>
                    <td
                      className="fs-6 fw-normal co"
                      style={{ color: "#13547a" }}
                    >
                      {question.opt_B}
                    </td>
                    <td
                      className="fs-6 fw-normal co"
                      style={{ color: "#13547a" }}
                    >
                      {question.opt_C}
                    </td>
                    <td
                      className="fs-6 fw-normal co"
                      style={{ color: "#13547a" }}
                    >
                      {question.opt_D}
                    </td>
                    <td
                      className="fs-6 fw-normal co"
                      style={{ color: "#13547a" }}
                    >
                      {question.correct}
                    </td>

                    <td>
                      <button
                        className="btn btn-outline-warning bi bi-pencil btn-sm mx-2"
                        onClick={() => handleUpdateClick(question)}
                      ></button>
                      <button
                        className="btn  bi bi-trash btn-outline-danger  btn-sm"
                        onClick={() => DeleteQuestion(question.id)}
                      ></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bootstrap Modal for Update */}
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show d-block" : ""} `}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
          style={{ zIndex: 1050 }} // To ensure the modal is on top
        >
          <div className="modal-dialog  modal-dialog-centered " role="document">
            <div className="modal-content rounded-4 shadow-lg">
              <div
                className="modal-header  "
                style={{ backgroundColor: "#80d0c7" }}
              >
                <h2 className=" fw-bold  co ms-5 " id="updateModalLabel">
                  <u> Update Question</u>
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="question"
                    value={UpdatedQuestion.question || ""}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Other form inputs similar to the "Question" field */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="opt_A"
                    value={UpdatedQuestion.opt_A || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="opt_B"
                    value={UpdatedQuestion.opt_B || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="opt_C"
                    value={UpdatedQuestion.opt_C || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="opt_D"
                    value={UpdatedQuestion.opt_D || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="correct"
                    value={UpdatedQuestion.correct || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Repeat the input structure for Options B, C, D, Correct Option, and Aptitude Name */}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn "
                  style={{ backgroundColor: "#80d0c7" }}
                  onClick={() => UpdateQuestion(CurrentQuestion.id)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Showques;
