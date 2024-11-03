import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Adminside from "./pages/Admin/Adminside";
import Addques from "./pages/Admin/Addques";
import Showques from "./pages/Admin/Showques";
import Showuser from "./pages/Admin/Showuser";
import Showapplicant from "./pages/Admin/Showapplicant";
import Apply from "./pages/Apply";
import Test from "./pages/Test";
import CardDetails from "./pages/CardDetails";
import Alltest from "./pages/Alltest";
import Quiz from "./pages/Quiz";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import AddAptitude from "./pages/Admin/AddAptitude";
import Showptitude from "./pages/Admin/Showptitude";

// Helper function to retrieve user from localStorage
const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || null;
};

const App = () => {
  const user = getUserFromLocalStorage(); // Retrieve user directly
  const [userState, setUserState] = useState(user); // State to manage user

  // Check if user is admin
  const isAdmin = userState?.name === "admin";

  return (
    <BrowserRouter>
      <Navbar user={userState} />
      <Routes>
        {/* Public Routes */}
        {isAdmin ? (
          // Redirect admin users from home to admin side
          <Route path="/" element={<Navigate to="/admin" />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/registration" element={<Registration />} />
        {/* Pass setUser to Login so that it can update the user */}
        <Route path="/login" element={<Login setUser={setUserState} />} />

        {/* Restrict admin access to certain routes */}
        <Route
          path="/apply"
          element={isAdmin ? <Navigate to="/" /> : <Apply />}
        />
        <Route
          path="/test"
          element={isAdmin ? <Navigate to="/" /> : <Test />}
        />
        <Route
          path="/quiz/:id"
          element={isAdmin ? <Navigate to="/" /> : <Quiz />}
        />
        <Route
          path="/aptitude"
          element={isAdmin ? <Navigate to="/" /> : <Alltest />}
        />
        <Route
          path="/profile"
          element={isAdmin ? <Navigate to="/" /> : <Profile />}
        />
        <Route path="/setting/:id" element={<Setting />} />
        <Route
          path="/details/:id"
          element={isAdmin ? <Navigate to="/" /> : <CardDetails />}
        />

        {/* Admin Routes */}
        {isAdmin ? (
          <Route path="/admin" element={<Adminside />}>
            <Route path="question" element={<Addques />} />
            <Route path="showquestion" element={<Showques />} />
            <Route path="showuser" element={<Showuser />} />
            <Route path="showapplicant" element={<Showapplicant />} />
            <Route path="addaptitude" element={<AddAptitude />} />
            <Route path="showaptitude" element={<Showptitude />} />
          </Route>
        ) : (
          // Redirect non-admin users from admin routes to home
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}

        {/* Catch-all route to redirect any unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
