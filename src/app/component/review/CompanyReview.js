import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { companyReview } from "../../features/review/reviewSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar/Navbar";
import { clearState } from "../../features/auth/authSlice";
// import { clearCompanyState } from "../../features/review/reviewSlice";

const CompanyReview = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useSelector((state) => state.review);
  const { review_message, loading, error } = data;

  // Display error or success messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
    }
    if (review_message) {
      toast.success(review_message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
      navigate(`/companydetails/${id}`);
    }
  }, [error, review_message]);

  const defaultValue = {
    subject: "",
    review: "",
    rating: "",
  };
  // Validation schema using yup
  const validationSchema = yup.object().shape({
    subject: yup.string().required("Please enter review subject"),
    review: yup.string().required("Please enter company review"),
    rating: yup.number().required("Please enter company rating"),
  });

  /// Handle form submission
  const handleSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const review_obj = { ...values, user_id: user._id, company_id: id };
    console.log("before dispatch :", review_obj);
    dispatch(companyReview(review_obj)); // Dispatching the signInUser action with form values
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="review-main">
        <h2>Fill the company review</h2>
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >

        <div className="form-area">
          <Form>
            <div className="col-md-10 mt-4">
              <Field
                type="text"
                name="subject"
                placeholder="Enter company review subject"
                className="form-control"
              />
              <p className="text-danger">
                <ErrorMessage name="subject" />
              </p>
            </div>

            <div className="col-md-10 mt-4">
              <Field
                type="text"
                name="review"
                placeholder="Enter company review"
                className="form-control"
              />
              <p className="text-danger">
                <ErrorMessage name="review" />
              </p>
            </div>
            <div className="col-md-10 mt-4">
              <Field
                type="text"
                name="rating"
                placeholder="Please Rate"
                className="form-control"
              />
              <p className="text-danger">
                <ErrorMessage name="rating" />
              </p>
            </div>
            <button type="submit" className="review-submit-btn">
              Submit
            </button>
          </Form>
        </div>
        </Formik>
      </div>
    </>
  );
};
export default CompanyReview