import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearState, passwordResetEmail } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  const { message, error } = data;

  // Display error or success messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
      navigate("/login");
    }
  }, [error, message]);

  // Initial values for the form
  const defaultValue = {
    email: "",
  };

  //Validation schema using yup
  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Enter your email"),
  });
  // Handle form submission
  const handleSubmit = (value) => {
    const { email } = value;
    dispatch(passwordResetEmail({ email }));
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="col-md-8-text-center">
          <h2>Reset Password</h2>
        </div>
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="form-area">
            <Form>
              <div className="col-md-10 mt-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
                <p className="text-danger">
                  <ErrorMessage name="email" />
                </p>
              </div>
              <button className="btn btn-primary mt-4" type="submit">
                {" "}
                Submit
              </button>
              <br />
              <br />
              <p>I dont have an account</p>
              <Link to="/">Register Now</Link>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
};

export default ResetPasswordEmail;
