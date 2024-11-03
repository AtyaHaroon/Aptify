import React, {  useState } from "react";

const Addques = () => {
  // aptitude api
  // question state
  const [Question, setQuestion] = useState("");
  const [Opt_A, setOpt_A] = useState("");
  const [Opt_B, setOpt_B] = useState("");
  const [Opt_C, setOpt_C] = useState("");
  const [Opt_D, setOpt_D] = useState("");
  const [Correct, setCorrect] = useState("");

  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Question && Opt_A && Opt_B && Opt_C && Opt_D && Correct) {
      try {
        const newQuest = {
          question: Question,
          opt_A: Opt_A,
          opt_B: Opt_B,
          opt_C: Opt_C,
          opt_D: Opt_D,
          correct: Correct,
        };

        const Response = await fetch(
          "https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/Question",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newQuest),
          }
        );

        if (Response.status === 201) {
          setError("");
          setSuccess("Question Added Successfully");

          // Reset form fields
          setQuestion("");
          setOpt_A("");
          setOpt_B("");
          setOpt_C("");
          setOpt_D("");
          setCorrect("");
        }
      } catch (error) {
        setError("An error occurred while adding the question.");
      }
    } else {
      setError("Please fill out all the fields.");
    }
  };

  return (
    <>
      <section className=" signup">
        <br />
        <br />
        <div className="containerques mt-5 shadow-lg">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title fw-bold">
                <u> Add Question</u>
              </h2>

              {Error && (
                <div className="alert alert-danger" role="alert">
                  <p>{Error}</p>
                </div>
              )}
              {Success && (
                <div className="alert alert-success" role="alert">
                  <p>{Success}</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="register-form"
                id="register-form"
              >
                <div className="form-group col-10 ms-5">
                  <label htmlFor="name">
                    <span className=" material-icons-name">Q:</span>
                  </label>
                  <input
                    type="text"
                    name="Question"
                    id="name"
                    placeholder="Write Question"
                    value={Question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                <div className="form-group col-10 ms-5">
                  <label htmlFor="option A">
                    <i className="zmdi zmdi-chevron-right"></i>
                  </label>
                  <input
                    type="text"
                    name="option A"
                    id="option A"
                    placeholder="Enter option A"
                    value={Opt_A}
                    onChange={(e) => setOpt_A(e.target.value)}
                  />
                </div>

                <div className="form-group col-10 ms-5">
                  <label htmlFor="option B">
                    <i className="zmdi zmdi-chevron-right"></i>
                  </label>
                  <input
                    type="text"
                    name="option B"
                    id="option B"
                    placeholder="Enter option B"
                    value={Opt_B}
                    onChange={(e) => setOpt_B(e.target.value)}
                  />
                </div>

                <div className="form-group col-10 ms-5">
                  <label htmlFor="option C">
                    <i className="zmdi zmdi-chevron-right"></i>
                  </label>
                  <input
                    type="text"
                    name="option C"
                    id="option C"
                    placeholder="Enter option C"
                    value={Opt_C}
                    onChange={(e) => setOpt_C(e.target.value)}
                  />
                </div>

                <div className="form-group col-10 ms-5">
                  <label htmlFor="option D">
                    <i className="zmdi zmdi-chevron-right"></i>
                  </label>
                  <input
                    type="text"
                    name="option D"
                    id="option D"
                    placeholder="Enter option D"
                    value={Opt_D}
                    onChange={(e) => setOpt_D(e.target.value)}
                  />
                </div>

                <div className="form-group col-10 ms-5">
                  <label htmlFor="option D">
                    <i className="zmdi zmdi-chevron-right"></i>
                  </label>
                  <input
                    type="text"
                    name="Correct Option"
                    id="Correct Option"
                    placeholder="Enter Correct Option"
                    value={Correct}
                    onChange={(e) => setCorrect(e.target.value)}
                  />
                </div>

                <div className="form-group form-button">
                  <button
                    style={{
                      backgroundColor: "transparent", // Initially transparent background for outline effect
                      border: "2px solid #80d0c7", // Border color matches the original background color
                      color: "#80d0c7", // Text color matches the border color
                      transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effect
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                      e.target.style.color = "#fff"; // Change text color to white
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                      e.target.style.color = "#80d0c7"; // Reset text color
                    }}
                     type="submit"
                    className="btn form-submit btn-lg"
                  >
                    Add Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Addques;
