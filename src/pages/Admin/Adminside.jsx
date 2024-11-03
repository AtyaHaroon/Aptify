import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Adminside = () => {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", margin: 0 }}>
      <div className="row" style={{ minHeight: "100vh", margin: 0 }}>
        {/* Sidebar */}
        <div
          className="col-2  "
          style={{
            height: "auto",
            backgroundColor: "#80d0c7",
            padding: "20px 0",
            boxShadow: "3px 0 7px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="fw-bold"
            style={{
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            <u style={{ color: "#13547a" }}>Admin Panel</u>
          </h2>

          <ul className="nav text-center nav-pills mt-2 flex-column">
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="question"
                className={`nav-link ${
                  location.pathname === "/question" ? "active" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/question" ? "white" : "#13547a",
                  padding: "15px",
                  textDecoration: "none",
                  display: "block",
                  backgroundColor:
                    location.pathname === "/question"
                      ? "#13547a"
                      : "transparent",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s, color 0.3s",
                  boxShadow:
                    location.pathname === "/question"
                      ? "inset 0 0 5px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                Add Question
              </Link>
            </li>
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="showquestion"
                className={`nav-link ${
                  location.pathname === "/showquestion" ? "active" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/showquestion" ? "white" : "#13547a",
                  padding: "15px",
                  textDecoration: "none",
                  display: "block",
                  backgroundColor:
                    location.pathname === "/showquestion"
                      ? "#13547a"
                      : "transparent",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s, color 0.3s",
                  boxShadow:
                    location.pathname === "/showquestion"
                      ? "inset 0 0 5px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                Show Question
              </Link>
            </li>
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="showuser"
                className={`nav-link ${
                  location.pathname === "/showuser" ? "active" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/showuser" ? "white" : "#13547a",
                  padding: "15px",
                  textDecoration: "none",
                  display: "block",
                  backgroundColor:
                    location.pathname === "/showuser"
                      ? "#13547a"
                      : "transparent",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s, color 0.3s",
                  boxShadow:
                    location.pathname === "/showuser"
                      ? "inset 0 0 5px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                Show Users
              </Link>
            </li>
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="showapplicant"
                className={`nav-link ${
                  location.pathname === "/showapplicant" ? "active" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/showapplicant"
                      ? "white"
                      : "#13547a",
                  padding: "15px",
                  textDecoration: "none",
                  display: "block",
                  backgroundColor:
                    location.pathname === "/showapplicant"
                      ? "#13547a"
                      : "transparent",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s, color 0.3s",
                  boxShadow:
                    location.pathname === "/showapplicant"
                      ? "inset 0 0 5px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                Show Applicant
              </Link>
            </li>
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="addaptitude"
                className={`nav-link ${
                  location.pathname === "/addaptitude" ? "active" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/addaptitude" ? "white" : "#13547a",
                  padding: "15px",
                  textDecoration: "none",
                  display: "block",
                  backgroundColor:
                    location.pathname === "/addaptitude"
                      ? "#13547a"
                      : "transparent",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s, color 0.3s",
                  boxShadow:
                    location.pathname === "/addaptitude"
                      ? "inset 0 0 5px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                Add Aptitude
              </Link>
            </li>
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="showaptitude"
                className={`nav-link ${
                  location.pathname === "/showaptitude" ? "active" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/showaptitude" ? "white" : "#13547a",
                  padding: "15px",
                  textDecoration: "none",
                  display: "block",
                  backgroundColor:
                    location.pathname === "/showaptitude"
                      ? "#13547a"
                      : "transparent",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s, color 0.3s",
                  boxShadow:
                    location.pathname === "/showaptitude"
                      ? "inset 0 0 5px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
              >
                Show Aptitude
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-10 ">
          <div className="container  text-center mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminside;
