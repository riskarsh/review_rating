import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CompanyDetails.css";
import Navbar from "../navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { getCompanyDetails } from "../../features/company/companySlice";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const companies = useSelector((state) => state.company);
  const { company_details, error, loading } = companies;
  const { companyDetails, comments } = company_details;
  const { companyName, location, city, founded, company_logo } = {...companyDetails};

  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, [dispatch]);

  // Function to format the timestamp to "dd-mm-yyyy, hr:min"
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="review-main">
        {loading && <div> One moment please....</div>}
        {error && <div>{`Fetching Problem - ${error}`}</div>}
        <div className="review-details-container">
          <div className="review-logo">
            <img
              src={`http://localhost:9000${company_logo}`}
              alt="Company Logo"
              width="100"
              height="100"
            />
          </div>
          <div className="review-info">
            <p>Founded {founded}</p>
            <h1>{companyName}</h1>
            <p>{location}</p>
            <p className="star-rating">
              {" "}
              5
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}
              <span className="compreviews"> 2 Reviews</span>
            </p>
          </div>
          <Link to={`/companyreviews/${id}`}>
            <button type="button" className="review-btn">
              Add Review
            </button>
          </Link>
        </div>
        <div className="review-comments">
          {comments &&
            comments.map(
              ({ _id, subject, review, rating, user_id, createdAt }) => (
                <div className="reviews">
                  <div className="userpic">
                    <img
                      src={`http://localhost:9000${user_id.profilepic}`}
                      alt="userpic"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="user-review">
                    <h3>{user_id.name}</h3>
                    <h5 className="star-rating">
                      {Array.from({ length: rating }).map((_, index) => (
                        <span key={index}>&#9733;</span>
                      ))}
                    </h5>
                    <h4>{formatDate(createdAt)}</h4>
                    <p>{review} </p>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
