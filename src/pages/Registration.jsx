import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Cnic, setCnic] = useState("");
  const [Password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [Contact, setContact] = useState("");

  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Name && Name.length > 2) {
      if (Email) {
        if (Cnic && Cnic.length > 12) {
          if (Contact && Contact.length > 11) {
            if (Password && Password.length > 8) {
              if (Cpassword && Cpassword.length > 8) {
                if (Password === Cpassword) {
                  try {
                    const newUser = {
                      name:Name,
                      email:Email,
                      cnic:Cnic,
                      password:Password,
                      contact:Contact,
                    };
                    const response = await fetch(
                      "https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/user",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newUser),
                      }
                    );

                    if (response.status === 201) {
                      setError("");
                        setSuccess("Account Registered Successfully !!");
                        
                         setTimeout(() => {
                           navigate("/login");
                         }, 1000);
                    } else {
                      setError("Registration failed.");
                    }
                  } catch (error) {
                    console.log(error);
                    setError("An error occurred. Please try again.");
                  }
                } else {
                  setError("Passwords do not match");
                }
              } else {
                setError("Confirm Password must be filled");
              }
            } else {
              setError("Password must be strong (minimum 8 characters)");
            }
          } else {
            setError("Valid Contact Number is required");
          }
        } else {
          setError("Please enter a valid CNIC number");
        }
      } else {
        setError("Please enter your email");
      }
    } else {
      setError("Name must be valid");
    }
  };

  return (
    <section className="signup section-bg">
      <br />
      <br />
      <div className="containernavbar">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign Up</h2>

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
              onSubmit={handleSubmit}
              className="register-form"
              id="register-form"
            >
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cnic">
                  <i className="zmdi zmdi-account-box-mail"></i>
                </label>
                <input
                  type="text"
                  name="cnic"
                  id="cnic"
                  placeholder="Your CNIC"
                  onChange={(e) => setCnic(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">
                  <i className="zmdi zmdi-phone"></i>
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Your Contact Number"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="re_pass">
                  <i className="zmdi zmdi-lock-outline"></i>
                </label>
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  placeholder="Repeat your password"
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="agree-term"
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in
                  <Link to="#" className="term-service">
                    Terms of service
                  </Link>
                </label>
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
                  id="signup"
                  className="btn btn-lg form-submit"
                 
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <div className="signup-image">
            <div>
              <img src="assets/images/signup-image.jpg" alt="sign up" />
            </div>
            <Link to="/login" className="signup-image-link">
              I am already a member
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default Registration;
