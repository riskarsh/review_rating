import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link,useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar/Navbar";
import { getCompanyDetails, clearCompanyState } from "../../features/company/companySlice";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id }= useParams();

  const companies = useSelector((state) => state.company);
  const { cmpDetail_message,company_details, error, loading } = companies;
  const {companyDetails, comments}=company_details;
  const { companyName,location,city,founded,company_logo}={...companyDetails}
  console.log("companyDETAILS", company_details)
//   console.log("comp Details", companyDetails)
//   console.log("comp comments",comments)

  // To retrive the company details
  useEffect(() => {
    dispatch(getCompanyDetails(id));
  },[dispatch])


  return(
    <>
        <Navbar/>
        <ToastContainer/>
        <h1>{companyName}</h1>
    </>
  )
}

export default CompanyDetails;