import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CompanyList.css";
import Navbar from "../navbar/Navbar";
import CreateCompany from "./CreateCompany";
import arrow from "../../assets/arrow.jpeg";
import filter from "../../assets/filter.png";
import "react-toastify/dist/ReactToastify.css";
import { clearCompanyState, getCompanies} from "../../features/company/companySlice";

const Companylist = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company);
  const { cmplist_message, company_data, error, loading } = companies;
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);

  // Display error or success messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
    }
    if (cmplist_message) {
    }
  }, [error, cmplist_message]);

  // To retrive the company data
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  // Function to toggle the Create Company modal
  const toggleCreateCompanyModal = () => {
    setShowCreateCompanyModal(!showCreateCompanyModal);
  };

  return (
    <>
      <Navbar />
      <div className="company-main">
        <div className="company-para">
          <p>Select city</p>
          <p>Sort:</p>
        </div>
        <div className="company-city">
          <div className="find-city">
            <input
              type="text"
              placeholder="Enter city to search"
              className="find-city-input"
            ></input>
            <button className="company-btn">Find Company</button>
          </div>
          <div className="add-sort">
            <button
              type="submit"
              className="company-btn"
              onClick={toggleCreateCompanyModal}
            >
              + Add Company
            </button>
            <img src={filter} alt="filter" width="40" height="40" />
          </div>
        </div>
        <hr></hr>
        <hr></hr>
        <div className="results">
          <p> Results Found : {company_data.length}</p>
        </div>
        {loading && <div> One moment please....</div>}
        {error && <div>{`Fetching Problem - ${error}`}</div>}

        {company_data &&
          company_data.map(
            ({ _id, company_logo, companyName, location, city, founded }) => (
              <Link to={`/companydetails/${_id}`}>
                <div className="company-details-container">
                  <div className="company_logo">
                    <img
                      src={`http://localhost:9000${company_logo}`}
                      alt="Company Logo"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="company_info">
                    <p>Founded {founded}</p>
                    <h2>{companyName}</h2>
                    <p>{location}</p>
                    <p className="star-rating">
                      {" "}
                      5
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>&#9733;</span>
                      ))}
                      <span className="reviews"> 2 Reviews</span>
                    </p>
                  </div>
                  <div className="company_arrow">
                    <img src={arrow}></img>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
      {/* Create Company Modal */}
      {showCreateCompanyModal && (
        <div className="modal" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Company</h5>
                <button
                  type="button"
                  className="close"
                  onClick={toggleCreateCompanyModal} // Close the modal when this button is clicked
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CreateCompany />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Companylist;
