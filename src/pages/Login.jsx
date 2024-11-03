import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [Cnic, setCnic] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (Cnic && Password) {
      try {
        const response = await fetch(
          "https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/user",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const users = await response.json();
        const user = users.find(
          (user) => user.cnic === Cnic && user.password === Password
        );

        if (user) {
          setSuccess("Login successful!!");
          setError("");

          // Log the user object to ensure it contains the expected fields
          console.log("Logged-in user:", user);

          // Save user login information in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              isLoggedIn: true,
              name: user.name, // Make sure the key is lowercase to match the hero section
              cnic: user.cnic,
              id: user.id, // Add user ID here
              // role: user.role, // Add role if needed
            })
          );
          // Check if localStorage has been set correctly
          console.log("Stored User:", localStorage.getItem("user"));
          // Navigate to appropriate page based on role
          if (user.name === "admin") {
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        } else {
          setError("Invalid CNIC or password");
          setSuccess("");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Please enter both CNIC and password");
    }
  };

  return (
    <section className="sign-in section-bg  ">
      <br />
      <br />
      <div className="containernavbar">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="assets/images/signin-image.jpg" alt="" />
            </figure>

            <Link to="/registration" className="signup-image-link">
              Create an account
            </Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>

            {Error && (
              <div className="alert alert-danger fs-6" role="alert">
                <p>{Error}</p>
              </div>
            )}
            {Success && (
              <div className="alert alert-success fs-6" role="alert">
                <p>{Success}</p>
              </div>
            )}

            <form
              onSubmit={handlesubmit}
              className="register-form"
              id="login-form"
            >
              <div className="form-group">
                <label htmlFor="your_cnic">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="number"
                  name="your_cnic"
                  id="your_cnic"
                  placeholder="Your CNIC Number"
                  onChange={(e) => setCnic(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="your_pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="your_pass"
                  id="your_pass"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  style={{ border: "2px solid #80d0c7" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                    e.target.style.color = "#fff"; // Change text color to white
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // Reset to outline style on mouse leave
                    e.target.style.color = "#80d0c7"; // Reset text color
                  }}
                  type="submit"
                  id="signin"
                  className="btn btn-lg form-submit"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="social-login">
              <span className="social-label">Or login with</span>
              <ul className="socials">
                <li>
                  <Link to="#">
                    <i className="display-flex-center zmdi zmdi-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="display-flex-center zmdi zmdi-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="display-flex-center zmdi zmdi-google"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default Login;
