import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch,useSelector, } from "react-redux";
import { useNavigate, Link,useParams } from "react-router-dom";
import { clearState,resetPassword } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.user)
    const {message, error}= data
    const{id, token} = useParams()
    
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
    newPassword: "",
    confirmPassword:"",
    }

    //Validation schema using yup
    const validationSchema = yup.object().shape({
    newPassword: yup.string().required("Enter your password"),
    confirmPassword: yup.string().required("Enter your password"),
    })
     // Handle form submission
    const handleSubmit = (values) => {
    const password_obj = {...values, id: id, token: token}
    dispatch(resetPassword(password_obj));
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
              type="text"
              name="newPassword"
              placeholder="Enter your new password"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="password" />
            </p>
            </div>
            <div className="col-md-10 mt-4">
            <Field
              type="text"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="form-control"
            />
            <p className="text-danger">
              <ErrorMessage name="password" />
            </p>
            </div>
            <button className="btn btn-primary mt-4" type="submit"> Submit</button>
            <br/><br/>
            <p>I dont have an account</p>
            <Link to="/login">Login</Link>
        </Form>
        </div>
      </Formik>
      </div>
    </>
  )
}
export default ResetPassword
