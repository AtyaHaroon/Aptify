import React, { useEffect, useState } from "react";

const Showptitude = () => {
  const [Aptitudes, setAptitudes] = useState([]);
  const [CurrentAptitude, setCurrentAptitude] = useState(null);
  const [UpdatedAptitude, setUpdatedAptitude] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Fetch Aptitude Tests
  useEffect(() => {
    const fetchAptitudes = async () => {
      try {
        const response = await fetch(
          "https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude"
        );
        if (response.ok) {
          const aptitudeData = await response.json();
          setAptitudes(aptitudeData);
        }
      } catch (error) {
        console.error("Error fetching aptitude tests:", error);
      }
    };
    fetchAptitudes();
  }, []);

  // Delete aptitude test
  const DeleteAptitude = async (id) => {
    try {
      const response = await fetch(
        `https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setAptitudes((prevAptitudes) =>
          prevAptitudes.filter((apt) => apt.id !== id)
        );
        console.log("Aptitude test deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting aptitude test:", error);
    }
  };

  // Set the selected aptitude for update and open modal
  const handleUpdateClick = (aptitude) => {
    setCurrentAptitude(aptitude);
    setUpdatedAptitude(aptitude);
    setShowModal(true);
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    setUpdatedAptitude({ ...UpdatedAptitude, [e.target.name]: e.target.value });
  };

  // Update aptitude test
  const UpdateAptitude = async (id) => {
    try {
      const response = await fetch(
        `https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(UpdatedAptitude),
        }
      );
      if (response.ok) {
        setAptitudes((prevAptitudes) =>
          prevAptitudes.map((apt) => (apt.id === id ? UpdatedAptitude : apt))
        );
        console.log("Aptitude test updated successfully");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating aptitude test:", error);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <section>
        <div className="container mt-4">
          <h2 className="text-center co fw-bold mt-4">
            <u>Aptitude Tests List</u>
          </h2>

          <table className="table table-bordered mt-4 shadow-lg">
            <thead>
              <tr className="table-success">
                <th
                  className="fs-5 fw-semi-bold"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  #
                </th>
                <th
                  className="fs-5 fw-semi-bold"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Title
                </th>
                <th
                  className="fs-5 fw-semi-bold"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Short Description
                </th>
                <th
                  className="fs-5 fw-semi-bold"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Description
                </th>

                <th
                  className="fs-5 fw-semi-bold"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Date
                </th>
                <th
                  className="fs-5 fw-semi-bold"
                  style={{ color: "#13547a" }}
                  scope="col"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Aptitudes.map((aptitude) => (
                <tr key={aptitude.id}>
                  <th style={{ color: "#13547a" }} scope="row">
                    {aptitude.id}
                  </th>
                  <td className="fs-6 fw-normal" style={{ color: "#13547a" }}>
                    {aptitude.name}
                  </td>
                  <td className="fs-6 fw-normal" style={{ color: "#13547a" }}>
                    {aptitude.short_desc}
                  </td>
                  <td className="fs-6 fw-normal" style={{ color: "#13547a" }}>
                    {aptitude.desc}
                  </td>

                  <td className="fs-6 fw-normal" style={{ color: "#13547a" }}>
                    {aptitude.date}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-warning bi-pencil btn-sm mx-2"
                      onClick={() => handleUpdateClick(aptitude)}
                    ></button>
                    <button
                      className="btn bi bi-trash btn-outline-danger btn-sm"
                      onClick={() => DeleteAptitude(aptitude.id)}
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <br />
      </section>
      {/* Bootstrap Modal for Update */}
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
          style={{ zIndex: 1050 }} // To ensure the modal is on top
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-4 shadow-lg">
              <div
                className="modal-header"
                style={{ backgroundColor: "#80d0c7" }}
              >
                <h2 className="fw-bold co ms-5" id="updateModalLabel">
                  <u>Update Aptitude Test</u>
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={UpdatedAptitude.name || ""}
                    onChange={handleInputChange}
                    placeholder="Enter aptitude name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="description"
                    value={UpdatedAptitude.desc || ""}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="short_desc"
                    value={UpdatedAptitude.short_desc || ""}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={UpdatedAptitude.date || ""}
                    onChange={handleInputChange}
                    min={today} // Prevent past dates
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#80d0c7" }}
                  onClick={() => UpdateAptitude(CurrentAptitude.id)}
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

export default Showptitude;
