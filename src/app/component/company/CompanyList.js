import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./CompanyList.css";
import { clearCompanyState, getCompanies } from "../../features/company/companySlice";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Companylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company);
  const { cmplist_message,company_data, error, loading } = companies;

  // Display error or success messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
    }
    if(cmplist_message){
    
    }
  },[error,cmplist_message]);

// To retrive the company data
  useEffect(() => {
    dispatch(getCompanies());
  },[dispatch])

  return (
    <>
      <Navbar />
    <div className="company-main">
      <div className="company-para">
      <p>Select city</p>
      <p>Sort</p>
      {/* {loading && <div> One moment please....</div>}
      {error &&(<div>{`Fetching Problem - ${error}`}</div>)}
      <div className="company-details-container">
      <ul>
        {company_data &&
        company_data.map(
          ({_id,company_logo, companyName,location,city,founded}) => (
            <Link to ={'/login'}>
            <h2>{companyName}</h2>
            <h2>{location}</h2>
            <p>{founded} {city}</p>

            </Link>
          )
        )} */}
        {/* <div className="company-logo">
          <img src={Logo} alt="Company Logo" width="100" height="100" />
        </div>
        <div className="company-info">
          
          
          <p>Company Tagline or Description</p>
        </div> */}
        {/* </ul> */}

      </div>
      <div className="company-city">
      <div className="find-city">
      <input type="text" placeholder="Enter city to search" className="find-city-input"></input>
      <button className="company-btn">Find Company</button>

      </div>
      <div className="add-sort">
  
          
            <button type="submit" className="company-btn">
            <Link to="/createcompany">Add Company</Link></button>
          
         
      

      </div>

      </div>
      <hr></hr>
    {loading && <div> One moment please....</div>}
      {error &&(<div>{`Fetching Problem - ${error}`}</div>)}
      <div className="company-details-container">
      <ul>
        {company_data &&
        company_data.map(
          ({_id,company_logo, companyName,location,city,founded}) => (
            <Link to ={'/login'}>
            <h2>{companyName}</h2>
            <h2>{location}</h2>
            <p>{founded} {city}</p>

            </Link>
          )
        )} 
        {/* <div className="company-logo">
          <img src={Logo} alt="Company Logo" width="100" height="100" />
        </div>
        <div className="company-info">
          
          
          <p>Company Tagline or Description</p>
        </div> */}
        </ul>
      
        </div>
        </div>
    </>
  );
};

export default Companylist;