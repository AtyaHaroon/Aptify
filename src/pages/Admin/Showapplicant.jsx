import React, { useEffect, useState } from "react";

const Showapplicant = () => {
  const [UserStatus, setUserStatus] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const Response = await fetch(
          "https://67046127ab8a8f892733b866.mockapi.io/Aptify/Apply"
        );
        if (Response.status === 200) {
          const status_Data = await Response.json();

          setUserStatus(status_Data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [UserStatus]);

  // Function to update the status
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(
        `https://67046127ab8a8f892733b866.mockapi.io/Aptify/Apply/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      // Update the local state after updating the status in the API
      setUserStatus((prevStatus) =>
        prevStatus.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-4 mb-5">
        <h2 className="text-center fw-bold co mt-4">
          <u> Applicant List </u>
        </h2>

        <table className="table  table-bordered mt-4 mb-5 shadow-lg">
          <thead>
            <tr className="table-success ">
              <th
                className="fs-5 fw-semi-bold co"
                style={{ color: "#13547a" }}
                scope="col "
              >
                #
              </th>
              <th
                className="fs-5 fw-semi-bold co"
                style={{ color: "#13547a" }}
                scope="col"
              >
                User Name
              </th>
              <th
                className="fs-5 fw-semi-bold co"
                style={{ color: "#13547a" }}
                scope="col"
              >
                Applied For
              </th>
              <th
                className="fs-5 fw-semi-bold co"
                style={{ color: "#13547a" }}
                scope="col"
              >
                Percentage
              </th>
              <th
                className="fs-5 fw-semi-bold co"
                style={{ color: "#13547a" }}
                scope="col"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {UserStatus.map((apply, index) => {
              return (
                <>
                  <tr key={index}>
                    <th
                      className="fs-6 fw-semi-bold co"
                      style={{ color: "#13547a" }}
                      scope="row"
                    >
                      {apply.id}
                    </th>
                    <td
                      className="text-capitalize fs-6 fw-semi-bold co"
                      style={{ color: "#13547a" }}
                    >
                      {apply.user_name}
                    </td>
                    <td
                      className="fs-6 fw-semi-bold co"
                      style={{ color: "#13547a" }}
                    >
                      {apply.apt_name}
                    </td>
                    <td
                      className="fs-6 fw-semi-bold co"
                      style={{ color: "#13547a" }}
                    >
                      {apply.percentage}%
                    </td>
                    <td
                      className="text-capitalize"
                      style={{ color: "#13547a" }}
                    >
                      {/* Conditionally render buttons or status text */}
                      {apply.status === "Approved" ||
                      apply.status === "Rejected" ? (
                        <span className="fs-6 fw-semi-bold co">
                          {apply.status}
                        </span>
                      ) : (
                        <>
                          <button
                            style={{
                              backgroundColor: "transparent", // Initially transparent background for outline effect
                              border: "2px solid #80d0c7", // Border color matches the original background color
                              color: "#80d0c7", // Text color matches the border color
                              transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effect
                            }}
                            className="btn btn-sm"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                              e.target.style.color = "#fff"; // Change text color to white
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                              e.target.style.color = "#80d0c7"; // Reset text color
                            }}
                            onClick={() => updateStatus(apply.id, "Approved")}
                          >
                            Approved
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => updateStatus(apply.id, "Rejected")}
                          >
                            Rejected
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
    </>
  );
};

export default Showapplicant;
