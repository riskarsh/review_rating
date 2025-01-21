import * as yup from "yup";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import sideCircle from "../../assets/sideCicle.png";
import circleStar from "../../assets/circleStar.jpeg";
import loginpriview from "../../assets/loginpreview.png";
import { signInUser, clearState } from "../../features/auth/authSlice";

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
      navigate("/companylist");
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
    dispatch(signInUser(values)); // Dispatching the signInUser action with form values
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="signin-main">
          <div className="signin-left">
            <h1> WELCOME </h1>
            <p>TO the login page</p>
            <img src={loginpriview} alt="" />
          </div>
          <div className="signin-right">
            <div className="form-image">
              <div className="left-image">
                <img src={sideCircle} alt="" />
              </div>
              <div className="right-image">
                <img src={circleStar} alt="" />
              </div>
            </div>
            <div className="signin-heading">
              <h2> Login</h2>
              <p>Hello! PLease enter your details for login</p>
            </div>
            <div className="form-area">
              <Form>
                <div className="col-md-10 mt-4">
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
                <p>
                  <Link to="/resetpasswordemail">Forgot Password?</Link>
                </p>
                <button type="submit" className="signinbutton">
                  Login
                </button>
              </Form>
            </div>
            <div className="signin-last">
              <hr></hr>
              <p>
                I don't have an account on Review & Rate
                <Link to={"/"}>
                  {" "}
                  <strong>Register Now</strong>{" "}
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Login;
