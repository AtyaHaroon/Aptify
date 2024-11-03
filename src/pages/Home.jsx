import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  // State to hold the user's name
  const [userName, setUserName] = useState("");
  // State to hold aptitude data
  const [Aptitude, setAptitude] = useState([]);
  //date filter
  const today = new Date();
  // Function to fetch aptitude data
  const fetchAptitude = async () => {
    try {
      const response = await fetch(
        "https://67046127ab8a8f892733b866.mockapi.io/Aptify/aptitude"
      );
      if (response.ok) {
        const Aptitude_data = await response.json();
        console.log(Aptitude_data); // Log the fetched data to see its structure
        setAptitude(Aptitude_data);
      }
    } catch (error) {
      console.error("Error fetching aptitude data:", error);
    }
  };

  // Function to handle user state updates based on localStorage
  const updateUserState = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setUserName(storedUser.name);
    } else {
      setUserName(""); // Clear username if logged out
    }
  };

  useEffect(() => {
    // Fetch user data from localStorage and aptitude data on mount
    updateUserState();
    fetchAptitude();

    // Set up listener for changes in localStorage (login/logout)
    const handleStorageChange = () => {
      updateUserState();
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    console.log(Aptitude); // Log the aptitude data to see if there are multiple items
  }, [Aptitude]);

  // Function to filter and slice aptitude data
  const filterAndSliceAptitude = (name) => {
    const trimmedName = name.trim().toLowerCase(); // Convert to lower case
    return Aptitude.filter(
      (apt) => apt.name.trim().toLowerCase() === trimmedName
    ).slice(0, 3); // Convert apt.name to lower case as well
  };

  // Filter and slice data for each test
  const filteredAptitudeM = filterAndSliceAptitude("MCAT");
  const filteredAptitudeE = filterAndSliceAptitude("ECAT");
  const filteredAptitudeL = filterAndSliceAptitude("LSAT");
  const filteredAptitudeG = filterAndSliceAptitude("GMAT");
  const filteredAptitudeR = filterAndSliceAptitude("GRE");

  // Navigate hook for redirection
  const navigate = useNavigate();

  const handleApplyClick = (event, aptitudeName) => {
    event.preventDefault();

    // Find the selected aptitude by aptitudeName to extract the short_desc
    const selectedAptitude = Aptitude.find((apt) => apt.name === aptitudeName);
    const shortDesc = selectedAptitude ? selectedAptitude.short_desc : "";

    if (userName) {
      // Pass shortDesc in the URL parameters
      navigate(
        `/apply?userName=${userName}&aptitudeName=${aptitudeName}&shortDesc=${encodeURIComponent(
          shortDesc
        )}`
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <section className="hero-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h1 className=" text-white text-center text-uppercase">
                Hey, {userName ? userName : "Guest"}!
              </h1>
              <h6 className="text-center">Discover. Learn. Enjoy !!!</h6>
              <form
                method="get"
                className="custom-form mt-4 pt-2 mb-lg-0 mb-5"
                role="search"
              >
                <div className="input-group input-group-lg">
                  <span
                    className="input-group-text bi-search"
                    id="basic-addon1"
                  ></span>

                  <input
                    name="keyword"
                    type="search"
                    className="form-control"
                    id="keyword"
                    placeholder="Search your Tests ..."
                    aria-label="Search"
                  />

                  <button type="submit" className="form-control">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-12 mb-3 mb-lg-0">
              <div className="custom-block bg-white shadow-lg">
                <Link to="">
                  <div className="d-flex ">
                    <div>
                      <h5 className="mb-1 co text-center">Skill Assessment:</h5>

                      <p className="mb-0 co mt-3 fs-5 text-center">
                        Aptitude tests help evaluate an individual's innate
                        abilities and potential, providing insight into
                        strengths and weaknesses relevant to specific fields or
                        careers.
                      </p>
                    </div>
                  </div>

                  <img
                    src="assets/images/topics/undraw_Remote_design_team_re_urdx.png"
                    className="custom-block-image img-fluid"
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="custom-block custom-block-overlay">
                <div className="d-flex flex-column h-100">
                  <img
                    src="assets/images/businesswoman-using-tablet-analysis.jpg"
                    className="custom-block-image img-fluid"
                    alt=""
                  />

                  <div className="custom-block-overlay-text d-flex">
                    <div>
                      <h5 className="text-white mb-2 text-center">
                        Enhanced Learning Strategies:
                      </h5>

                      <p className="text-white mt-4 fs-5 fw-medium text-center">
                        These tests provide insights into preferred learning
                        styles and cognitive strengths By understanding their
                        unique learning preferences, individuals can adopt more
                        effective methods to grasp complex concepts, leading to
                        improved academic performance, enhanced problem-solving
                        skills,This holistic approach fosters personal growth
                        and prepares individuals for long-term success in their
                        careers.
                      </p>
                    </div>
                  </div>

                  <div className="section-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section section-padding">
        <div className="container">
          <div className="col-12 text-center">
            <h2 className="mb-4 co">
              <u> Browse Category </u>
            </h2>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="design-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#design-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="design-tab-pane"
                  aria-selected="true"
                >
                  MCAT
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="marketing-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#marketing-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="marketing-tab-pane"
                  aria-selected="false"
                >
                  ECAT
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="finance-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#finance-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="finance-tab-pane"
                  aria-selected="false"
                >
                  LSAT
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="music-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#music-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="music-tab-pane"
                  aria-selected="false"
                >
                  GMAT
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="education-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#education-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="education-tab-pane"
                  aria-selected="false"
                >
                  GRE
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="design-tab-pane"
                  role="tabpanel"
                  aria-labelledby="design-tab"
                  tabindex="0"
                >
                  <div className="row ">
                    {filteredAptitudeM.map((apt, index) => {
                      // Parse the aptitude date
                      const aptitudeDate = new Date(apt.date); // Make sure apt.date is in a valid format

                      // Check if the aptitude date is less than today's date
                      const isPastDate = aptitudeDate < today;
                      return (
                        <>
                          <div
                            className="col-lg-4 col-md-6 col-12 mt-4  "
                            key={index}
                          >
                            <div className="custom-block bg-white shadow-lg">
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2 co text-center">
                                    {apt.name}
                                  </h5>

                                  <p className="mb-0 co text-center">
                                    {apt.short_desc}
                                  </p>
                                </div>
                              </div>

                              <img
                                src="assets/images/topics/undraw_Remote_design_team_re_urdx.png"
                                className="custom-block-image img-fluid"
                                alt=""
                              />

                              <div className="float-end mt-3">
                                <Link to={`/details/${apt.id}`}>
                                  <button className="btn co btn-outline-secondary btn-md fs-5">
                                    Details
                                  </button>
                                </Link>
                                {/* Apply button with login condition */}
                                <button
                                  style={{
                                    backgroundColor: "transparent", // Outline buttons typically have no background
                                    border: "3px solid #80d0c7", // Border color matches the background color you provided
                                    color: "#80d0c7",
                                    transition:
                                      "background-color 0.3s, color 0.3s",
                                  }}
                                  className={`btn  co btn-md ms-2 fs-5 ${
                                    isPastDate ? "disabled" : ""
                                  }`}
                                  disabled={isPastDate} // Disable button if date is past
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                                    e.target.style.color = "#fff"; // Change text color to white
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor =
                                      "transparent"; // Reset to outline style on mouse leave
                                    e.target.style.color = "#80d0c7"; // Reset text color
                                  }}
                                  onClick={(event) =>
                                    handleApplyClick(event, apt.name)
                                  } // Pass the aptitude name here
                                >
                                  Apply
                                </button>
                              </div>
                              <div className="mt-4">
                                <p className="text-center co text-center">
                                  {apt.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="marketing-tab-pane"
                  role="tabpanel"
                  aria-labelledby="marketing-tab"
                  tabindex="0"
                >
                  <div className="row">
                    {filteredAptitudeE.map((apt, index) => {
                      // Parse the aptitude date
                      const aptitudeDate = new Date(apt.date); // Make sure apt.date is in a valid format

                      // Check if the aptitude date is less than today's date
                      const isPastDate = aptitudeDate < today;
                      return (
                        <>
                          <div
                            className="col-lg-4 col-md-6 col-12 mt-4  "
                            key={index || apt.id}
                          >
                            <div className="custom-block bg-white shadow-lg">
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2 co text-center">
                                    {apt.name}
                                  </h5>

                                  <p className="mb-0 co text-center">
                                    {apt.short_desc}
                                  </p>
                                </div>
                              </div>

                              <img
                                src="assets/images/topics/undraw_online_ad_re_ol62.png"
                                className="custom-block-image img-fluid"
                                alt=""
                              />
                              <div className="float-end mt-3">
                                <Link to={`/details/${apt.id}`}>
                                  <button className="btn co btn-outline-secondary btn-md fs-5">
                                    Details
                                  </button>
                                </Link>
                                {/* Apply button with login condition */}
                                <button
                                  style={{
                                    backgroundColor: "transparent", // Outline buttons typically have no background
                                    border: "3px solid #80d0c7", // Border color matches the background color you provided
                                    color: "#80d0c7",
                                    transition:
                                      "background-color 0.3s, color 0.3s",
                                  }}
                                  className={`btn  co btn-md ms-2 fs-5 ${
                                    isPastDate ? "disabled" : ""
                                  }`}
                                  disabled={isPastDate} // Disable button if date is past
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                                    e.target.style.color = "#fff"; // Change text color to white
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor =
                                      "transparent"; // Reset to outline style on mouse leave
                                    e.target.style.color = "#80d0c7"; // Reset text color
                                  }}
                                  onClick={(event) =>
                                    handleApplyClick(event, apt.name)
                                  } // Pass the aptitude name here
                                >
                                  Apply
                                </button>
                              </div>
                              <div className="mt-4">
                                <p className="text-center co text-center">
                                  {apt.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="finance-tab-pane"
                  role="tabpanel"
                  aria-labelledby="finance-tab"
                  tabindex="0"
                >
                  <div className="row">
                    {filteredAptitudeL.map((apt, index) => {
                      // Parse the aptitude date
                      const aptitudeDate = new Date(apt.date); // Make sure apt.date is in a valid format

                      // Check if the aptitude date is less than today's date
                      const isPastDate = aptitudeDate < today;
                      return (
                        <>
                          <div
                            className="col-lg-4 col-md-6 col-12 mt-4  "
                            key={index}
                          >
                            <div className="custom-block bg-white shadow-lg">
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2 co text-center">
                                    {apt.name}
                                  </h5>

                                  <p className="mb-0 co text-center">
                                    {apt.short_desc}
                                  </p>
                                </div>
                              </div>

                              <img
                                src="assets/images/topics/undraw_Finance_re_gnv2.png"
                                className="custom-block-image img-fluid"
                                alt=""
                              />
                              <div className="float-end mt-3">
                                <Link to={`/details/${apt.id}`}>
                                  <button className="btn co btn-outline-secondary btn-md fs-5">
                                    Details
                                  </button>
                                </Link>
                                {/* Apply button with login condition */}
                                <button
                                  style={{
                                    backgroundColor: "transparent", // Outline buttons typically have no background
                                    border: "3px solid #80d0c7", // Border color matches the background color you provided
                                    color: "#80d0c7",
                                    transition:
                                      "background-color 0.3s, color 0.3s",
                                  }}
                                  className={`btn  co btn-md ms-2 fs-5 ${
                                    isPastDate ? "disabled" : ""
                                  }`}
                                  disabled={isPastDate} // Disable button if date is past
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                                    e.target.style.color = "#fff"; // Change text color to white
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor =
                                      "transparent"; // Reset to outline style on mouse leave
                                    e.target.style.color = "#80d0c7"; // Reset text color
                                  }}
                                  onClick={(event) =>
                                    handleApplyClick(event, apt.name)
                                  } // Pass the aptitude name here
                                >
                                  Apply
                                </button>
                              </div>
                              <div className="mt-4">
                                <p className="text-center co text-center">
                                  {apt.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="music-tab-pane"
                  role="tabpanel"
                  aria-labelledby="music-tab"
                  tabindex="0"
                >
                  <div className="row">
                    {filteredAptitudeG.map((apt, index) => {
                      // Parse the aptitude date
                      const aptitudeDate = new Date(apt.date); // Make sure apt.date is in a valid format

                      // Check if the aptitude date is less than today's date
                      const isPastDate = aptitudeDate < today;
                      return (
                        <>
                          <div
                            className="col-lg-4 col-md-6 col-12 mt-4  "
                            key={index}
                          >
                            <div className="custom-block bg-white shadow-lg">
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2 co text-center">
                                    {apt.name}
                                  </h5>

                                  <p className="mb-0 co text-center">
                                    {apt.short_desc}
                                  </p>
                                </div>
                              </div>

                              <img
                                src="assets/images/topics/undraw_Graduation_re_gthn.png"
                                className="custom-block-image img-fluid"
                                alt=""
                              />
                              <div className="float-end mt-3">
                                <Link to={`/details/${apt.id}`}>
                                  <button className="btn co btn-outline-secondary btn-md fs-5">
                                    Details
                                  </button>
                                </Link>
                                {/* Apply button with login condition */}
                                <button
                                  style={{
                                    backgroundColor: "transparent", // Outline buttons typically have no background
                                    border: "3px solid #80d0c7", // Border color matches the background color you provided
                                    color: "#80d0c7",
                                    transition:
                                      "background-color 0.3s, color 0.3s",
                                  }}
                                  className={`btn  co btn-md ms-2 fs-5 ${
                                    isPastDate ? "disabled" : ""
                                  }`}
                                  disabled={isPastDate} // Disable button if date is past
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                                    e.target.style.color = "#fff"; // Change text color to white
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor =
                                      "transparent"; // Reset to outline style on mouse leave
                                    e.target.style.color = "#80d0c7"; // Reset text color
                                  }}
                                  onClick={(event) =>
                                    handleApplyClick(event, apt.name)
                                  } // Pass the aptitude name here
                                >
                                  Apply
                                </button>
                              </div>
                              <div className="mt-4">
                                <p className="text-center co text-center">
                                  {apt.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="education-tab-pane"
                  role="tabpanel"
                  aria-labelledby="education-tab"
                  tabindex="0"
                >
                  <div className="row">
                    {filteredAptitudeR.map((apt, index) => {
                      // Parse the aptitude date
                      const aptitudeDate = new Date(apt.date); // Make sure apt.date is in a valid format

                      // Check if the aptitude date is less than today's date
                      const isPastDate = aptitudeDate < today;
                      return (
                        <>
                          <div
                            className="col-lg-4 col-md-6 col-12 mt-4  "
                            key={index}
                          >
                            <div className="custom-block bg-white shadow-lg">
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2 co text-center">
                                    {apt.name}
                                  </h5>

                                  <p className="mb-0 co text-center">
                                    {apt.short_desc}
                                  </p>
                                </div>
                              </div>

                              <img
                                src="assets/images/topics/undraw_Educator_re_ju47.png"
                                className="custom-block-image img-fluid"
                                alt=""
                              />
                              <div className="float-end mt-3">
                                <Link to={`/details/${apt.id}`}>
                                  <button className="btn co btn-outline-secondary btn-md fs-5">
                                    Details
                                  </button>
                                </Link>
                                {/* Apply button with login condition */}
                                <button
                                  style={{
                                    backgroundColor: "transparent", // Outline buttons typically have no background
                                    border: "3px solid #80d0c7", // Border color matches the background color you provided
                                    color: "#80d0c7",
                                    transition:
                                      "background-color 0.3s, color 0.3s",
                                  }}
                                  className={`btn  co btn-md ms-2 fs-5 ${
                                    isPastDate ? "disabled" : ""
                                  }`}
                                  disabled={isPastDate} // Disable button if date is past
                                  onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#80d0c7"; // Fill background on hover
                                    e.target.style.color = "#fff"; // Change text color to white
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.backgroundColor =
                                      "transparent"; // Reset to outline style on mouse leave
                                    e.target.style.color = "#80d0c7"; // Reset text color
                                  }}
                                  onClick={(event) =>
                                    handleApplyClick(event, apt.name)
                                  } // Pass the aptitude name here
                                >
                                  Apply
                                </button>
                              </div>
                              <div className="mt-4">
                                <p className="text-center co text-center">
                                  {apt.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section section-padding">
        <div className="section-overlay"></div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className=" mb-4 co">
                <u>How to Apply for the Aptitude Test?</u>
              </h2>
            </div>

            <div className="col-lg-10 col-12 mx-auto">
              <div className="timeline-container">
                <ul
                  className="vertical-scrollable-timeline"
                  id="vertical-scrollable-timeline"
                >
                  <div className="list-progress">
                    <div className="inner"></div>
                  </div>

                  <li>
                    <h4 className="text-white mb-3">Create an Account</h4>

                    <p className="text-white">
                      Visit the registration page on the Aptify website. Provide
                      basic personal information such as full name, email
                      address, CNIC, and contact details.After creating your
                      account, login with your CNIC and password on the login
                      page. Access your dashboard, where you can view test
                      schedules and available aptitude tests.
                    </p>

                    <div className="icon-holder">
                      <i className="bi-person"></i>
                    </div>
                  </li>

                  <li>
                    <h4 className="text-white mb-3">
                      Choose Your Aptitude Test
                    </h4>

                    <p className="text-white">
                      On your dashboard, browse through available tests. Select
                      the appropriate aptitude test based on your goals or the
                      requirements of the program you're applying for. Read the
                      instructions, rules, and test structure before
                      proceeding.Review the application form to ensure all
                      information is correct. Submit the application and wait
                      for confirmation.
                    </p>

                    <div className="icon-holder">
                      <i className="bi-search"></i>
                    </div>
                  </li>

                  <li>
                    <h4 className="text-white mb-3">
                      Confirmation and Test Schedule
                    </h4>

                    <p className="text-white">
                      Once your application and payment are confirmed, you will
                      receive a test schedule via email or on your dashboard.
                      Mark the date and time of the test on your calendar.The
                      test is conducted online and can be accessed from your
                      personal computer or a designated test center.
                    </p>

                    <div className="icon-holder">
                      <i className="bi bi-check2-all"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section-padding">
        <div className="container">
          <div className="row">
            <div className="text-center col-12">
              <h2 className="mb-4 co">
                <u> Frequently Asked Questions</u>
              </h2>
            </div>

            <div className="clearfix"></div>

            <div className="col-lg-5 col-12">
              <img
                src="assets/images/faq_graphic.jpg"
                className="img-fluid"
                alt="FAQs"
              />
            </div>

            <div className="col-lg-6 col-12 m-auto">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      What skills are assessed in an aptitude test?
                    </button>
                  </h2>

                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Aptitude tests evaluate skills like numerical reasoning,
                      verbal reasoning, logical thinking, spatial awareness, and
                      sometimes technical abilities.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      How can I prepare for an aptitude test?
                    </button>
                  </h2>

                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Practice sample questions, manage your time well, review
                      core concepts, and stay calm to avoid mistakes during the
                      test.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Can I retake the test if I fail?
                    </button>
                  </h2>

                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes, most tests allow retakes, but policies vary. Check
                      with the test provider for specific retake rules and
                      waiting periods.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-padding section-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center">
              <h2 className="mb-5 co">
                <u> Get in touch </u>
              </h2>
            </div>

            <div className="col-lg-5 col-12 mb-4 mb-lg-0">
              <iframe
                className="google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31157.75328576556!2d67.05590847220984!3d24.93288921685588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e78d6f2c45d%3A0x1e1e3f40bcb4577c!2sAptech%20North%20Nazimabad!5e0!3m2!1sen!2sus!4v1637029169144!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map showing Aptech North Nazimabad"
              ></iframe>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg- mb-md-0 ms-auto">
              <h4 className="mb-3 co">Head office</h4>

              <p className="co">
                Bay St &amp;, Larkin St, San Francisco, CA 94109, United States
              </p>

              <hr />

              <p className="d-flex align-items-center mb-1">
                <span className="me-2 co">Phone</span>

                <Link to="tel: 305-240-9671" className="site-footer-link">
                  305-240-9671
                </Link>
              </p>

              <p className="d-flex align-items-center">
                <span className="me-2 co">Email</span>

                <Link to="" className="site-footer-link">
                  Info@Aptify.com
                </Link>
              </p>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mx-auto ">
              <h4 className="mb-3 co">Dubai office</h4>

              <p className="co">
                Burj Park, Downtown Dubai, United Arab Emirates
              </p>

              <hr />

              <p className="d-flex align-items-center mb-1">
                <span className="me-2 co">Phone</span>

                <Link to="tel: 110-220-3400" className="site-footer-link">
                  110-220-3400
                </Link>
              </p>

              <p className="d-flex align-items-center">
                <span className="me-2 co">Email</span>

                <Link to="" className="site-footer-link">
                  Info@Aptify.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
