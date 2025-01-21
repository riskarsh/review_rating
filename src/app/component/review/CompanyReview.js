import * as yup from "yup";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { clearState } from "../../features/auth/authSlice";
import { companyReview } from "../../features/review/reviewSlice";

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
    rating: yup
      .number()
      .required("Please enter company rating")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
  });

  /// Handle form submission
  const handleSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const review_obj = { ...values, user_id: user._id, company_id: id };
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
                  as="textarea"
                  name="review"
                  placeholder="Enter company review"
                  className="form-control"
                />
                <p className="text-danger">
                  <ErrorMessage name="review" />
                </p>
              </div>
              <div className="col-md-10 mt-4">
                <label htmlFor="rating">Rating</label>
                <Field as="select" name="rating" className="form-control">
                  <option value="" label="Select a rating" />
                  <option value="1" label="1" />
                  <option value="2" label="2" />
                  <option value="3" label="3" />
                  <option value="4" label="4" />
                  <option value="5" label="5" />
                </Field>
                <p className="text-danger">
                  <ErrorMessage name="rating" />
                </p>
              </div>
              <button type="submit" className="company-btn">
                Submit
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
};

export default CompanyReview;
