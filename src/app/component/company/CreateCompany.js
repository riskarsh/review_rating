import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-toastify/dist/ReactToastify.css";
import {
  clearCompanyState,
  createCompany,
} from "../../features/company/companySlice";

const CreateCompany = () => {
  // State and Redux-related setup
  const [company_logo, setCompanylogo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.company);
  const { cmpcreate_message, error, loading } = data;

  // Display error or success messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
    }
    if (cmpcreate_message) {
      toast.success(cmpcreate_message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
      navigate("/companylist");
    }
  }, [error, cmpcreate_message]);

  // Initial values for the form
  const initialValues = {
    companyName: "",
    location: "",
    city: "",
    founded: "",
  };
  //Set Company picure
  const addCompanypic = (e) => {
    setCompanylogo(e.target.files[0]);
  };

  //Validation schema using yup
  const validationSchema = yup.object().shape({
    companyName: yup.string().required("Enter companyName"),
    location: yup.string().required("Enter location"),
    city: yup.string().required("Enter the city"),
    founded: yup.string().required("Enter the year"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cmp_obj = { ...values, userId: user._id, company_logo: company_logo };
    dispatch(createCompany(cmp_obj));
  };

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="col-md-10 mt-4">
            {" "}
            Company Name
            <Field type="text" name="companyName" className="form-control" />
            <p className="text-danger">
              <ErrorMessage name="companyName" />
            </p>
          </div>

          <div className="col-md-10 mt-4">
            Location
            <Field type="text" name="location" className="form-control" />
            <p className="text-danger">
              <ErrorMessage name="location" />
            </p>
          </div>

          <div className="col-md-10 mt-4">
            {" "}
            City
            <Field type="text" name="city" className="form-control" />
            <p className="text-danger">
              <ErrorMessage name="city" />
            </p>
          </div>

          <div className="col-md-10 mt-4">
            Founded
            <Field type="text" name="founded" className="form-control" />
            <p className="text-danger">
              <ErrorMessage name="founded" />
            </p>
          </div>
          <div className="col-md-10 mt-4">
            <input
              type="file"
              name="company_logo"
              className="form-control-file"
              onChange={addCompanypic}
            />
          </div>

          <button type="submit" className="company-btn">
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCompany;
