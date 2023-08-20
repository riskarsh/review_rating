import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
// import './Login.css';
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, clearState } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Component for user login
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user); // Accessing user state from Redux store
  const { message, error, loading } = data;

  // useEffect to handle error and success messages using toast
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
      navigate("/");
    }
  }, [error, message]);

  const defaultValue = {
    email: "",
    password: "",
  };

  // Validation schema using yup
  const validationSchema = yup.object().shape({
    email: yup.string().required().email("enter email"),
    password: yup.string().required("Enter ur password"),
  });

  /// Handle form submission
  const handleSubmit = (values) => {
    console.log("Values :", values);
    dispatch(signInUser(values)); // Dispatching the signInUser action with form values
  };

  return (
    <>
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="col-md-5 mt-4">
            <Field
              type="text"
              name="email"
              placeholder="Enter your email"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="email" />
            </p>
            <Field
              type="text"
              name="password"
              placeholder="Enter your password"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="password" />
            </p>
          </div>
          <br></br>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default Login;
