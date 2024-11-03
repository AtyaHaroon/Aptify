import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [Cnic, setCnic] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Retrieved user from localStorage:", storedUser);
    if (!storedUser || !storedUser.id) {
      setError("User ID is not defined");
      return;
    }

    const id = storedUser.id;

    async function getUserdata() {
      try {
        console.log("Fetching user with ID:", id);
        const response = await fetch(
          `https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/user/${id}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Fetch error details:", errorData);
          throw new Error(
            `Error ${response.status}: ${errorData.message || "User not found"}`
          );
        }
        const singledata = await response.json();
        console.log(singledata);
        if (!singledata) {
          throw new Error("User data not found");
        }

        setName(singledata.name);
        setEmail(singledata.email);
        setContact(singledata.contact);
        setCnic(singledata.cnic);
        setPassword(singledata.password);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    }

    getUserdata();
  }, [Error]); // Keep dependency array empty to avoid the warning.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Name.length < 3)
      return setError("Name must be at least 3 characters long");
    if (Email.length < 5)
      return setError("Email must be at least 5 characters long");
    if (Contact.length < 11)
      return setError("Contact must be at least 11 characters long");
    if (Cnic.length < 13)
      return setError("CNIC must be at least 13 characters long");
    if (Password.length < 6)
      return setError("Password must be at least 6 characters long");
    if (Password !== ConfirmPassword)
      return setError("Password and Confirm Password do not match");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const id = storedUser.id; // Get user ID from local storage

      const newUser = {
        name: Name,
        email: Email,
        contact: Contact,
        cnic: Cnic,
        password: Password,
      };
      const response = await fetch(
        `https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/user/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      if (response.ok) {
        setSuccess("User Updated Successfully");
        setError("");
        setTimeout(() => {
          navigate("/"); // Redirect to home after successful update
        }, 1000);
      } else {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
      setError("Error updating user information");
    }
  };

  return (
    <div
      className="container mt-5 border border-3 mb-5 p-4 rounded shadow-lg"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <h2 className="text-center co mb-4">
        <u>Update Your Information</u>
      </h2>
      {Error && (
        <div className="alert alert-danger text-center" role="alert">
          <p>{Error}</p>
        </div>
      )}
      {Success && (
        <div className="alert alert-success text-center" role="alert">
          <p>{Success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="col-md-8 offset-md-2">
        <div className="mb-4">
          <div className="input-group">
            <div className="input-group-text bg-light border-0">Full Name</div>
            <input
              type="text"
              className="form-control border-0 border-bottom"
              name="name"
              value={Name || ""} // Controlled input
              onChange={(e) => setName(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="input-group">
            <div className="input-group-text bg-light border-0">CNIC</div>
            <input
              type="text"
              className="form-control border-0 border-bottom"
              name="cnic"
              value={Cnic || ""} // Controlled input
              onChange={(e) => setCnic(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="input-group">
            <div className="input-group-text bg-light border-0">Email</div>
            <input
              type="email"
              className="form-control border-0 border-bottom"
              name="email"
              value={Email || ""} // Controlled input
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="input-group">
            <div className="input-group-text bg-light border-0">Password</div>
            <input
              type="password"
              className="form-control border-0 border-bottom"
              name="password"
              value={Password || ""} // Controlled input
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="input-group">
            <div className="input-group-text bg-light border-0">
              Confirm Password
            </div>
            <input
              type="password"
              className="form-control border-0 border-bottom"
              name="confirm-password"
              value={ConfirmPassword || ""} // Controlled input
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="input-group">
            <div className="input-group-text bg-light border-0">Contact</div>
            <input
              type="text"
              className="form-control border-0 border-bottom"
              name="contact"
              value={Contact || ""} // Controlled input
              onChange={(e) => setContact(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>

        <button
          style={{
            backgroundColor: "transparent",
            border: "2px solid #80d0c7",
            color: "#80d0c7",
            padding: "10px 20px",
            transition: "background-color 0.3s, color 0.3s",
          }}
          type="submit"
          className="btn btn-md mb-5 d-block mx-auto"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#80d0c7";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#80d0c7";
          }}
        >
          Update Information
        </button>
      </form>
    </div>
  );
};

export default Settings;
