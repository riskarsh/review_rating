import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./CompanyList.css";
const Companylist = () => {
  return (
    <div>
      <Navbar />
      <div className="company-details-container">
        <div className="company-logo">
          <img src="/path/to/company-logo.png" alt="Company Logo" width="100" height="100" />
        </div>
        <div className="company-info">
          <h2>Company Name</h2>
          <p>Company Tagline or Description</p>
        </div>
      </div>
      <Formik>
        <Form>
          <Link to="/createcompany">
            <button type="submit">Add Company</button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Companylist;