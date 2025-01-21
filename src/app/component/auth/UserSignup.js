import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./Signup.css";
import loginpriview from "../../assets/loginpreview.png";
import sideCircle from "../../assets/sideCicle.png";
import circleStar from "../../assets/circleStar.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, signUpUser } from "../../features/auth/authSlice"; //action
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Inittial schema of formik
const Signup = () => {
  // State and Redux-related setup
  const [profilePic, setProfilepic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  const { message, error, loading } = data;

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
    name: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    state: "",
  };
  //Set profile picure
  const addUserpic = (e) => {
    setProfilepic(e.target.files[0]);
  };

  //Validation schema using yup
  const validationSchema = yup.object().shape({
    name: yup.string().required("Enter Name"),
    email: yup.string().required().email("enter email"),
    password: yup.string().required("Enter ur password"),
    mobile: yup.string().required("Enter ur mobile"),
    city: yup.string().required("Enter ur city"),
    state: yup.string().required("Enter ur state"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    let userObj = { ...values, profilepic: profilePic };
    dispatch(signUpUser(userObj));
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="signup-main">
          <div className="signup-left">
            <h1> WELCOME </h1>
            <p>THIS IS A TEST OF MY CSS SKILLS</p>
            <img src={loginpriview} alt="" />
          </div>
          <div className="signup-right">
            <div className="form-image">
              <div className="left-image">
                <img src={sideCircle} alt="" />
              </div>
              <div className="right-image">
                <img src={circleStar} alt="" />
              </div>
            </div>
            <div className="signup-heading">
              <h2> Sign Up</h2>
              <p>Enter your details to sign up</p>
            </div>
            <div className="form-area">
              <Form>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="name" />
                  </p>
                </div>

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
                </div>
                <div className="col-md-10 mt-4">
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
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="mobile" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="city"
                    placeholder="Enter your City"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="City" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <Field
                    type="text"
                    name="state"
                    placeholder="Enter your State"
                    className="form-control"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="State" />
                  </p>
                </div>
                <div className="col-md-10 mt-4">
                  <input
                    type="file"
                    name="profilepic"
                    className="form-control-file"
                    onChange={addUserpic}
                  />
                </div>
                <br></br>

                <button type="submit" className="signupbutton">
                  Sign Up
                </button>
              </Form>
            </div>
            <div className="signup-last">
              <hr></hr>
              <p>
                I already have an account?
                <Link to={"/login"}>
                  {" "}
                  <strong>Login</strong>{" "}
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Signup;
