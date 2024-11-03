import React, { useState } from "react";

const AddAptitude = () => {
  // State variables for each field
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [shortDesc, setShortDesc] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on submit

    // Validate date
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate < today) {
      setError("Please select a date that is today or in the future.");
      return;
    }

    if (name && desc  && date && shortDesc) {
      setLoading(true); // Start loading
      try {
        const newExam = {
          name,
          desc,
          date,
          short_desc: shortDesc,
        };

        const response = await fetch(
          "https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude", // Adjust the endpoint as necessary
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExam),
          }
        );

        if (response.status === 201) {
          setError("");
          setSuccess("Aptitude added successfully");

          // Reset form fields
          setName("");
          setDesc("");
          setDate("");
          setShortDesc("");
        } else {
          setError("Failed to add Aptitude. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error); // Log error for debugging
        setError("An error occurred while adding the aptitude.");
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setError("Please fill out all the fields.");
    }
  };

  return (
    <section className="add-exam ">
      <br />
      <br />
      <div className="container mt-5 ">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className=" text-center mt-4 co  fw-bold">
              <u>Add Aptitude </u>
            </h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 m-5 ">
              <div className="row ">
                <div className="mb-3 col-6">
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter exam name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-6">
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  />
                </div>
              </div>
              <div className="mb-3 ">
                <textarea
                  id="shortDesc"
                  className="form-control"
                  placeholder="Enter short description"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  id="desc"
                  className="form-control"
                  placeholder="Enter description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="">
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
                  className="btn btn-lg"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Aptitude"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAptitude;
