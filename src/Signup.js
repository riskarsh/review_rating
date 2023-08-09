import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

//Inittial schema of formik
const Signup = () => {

    const defaultValue ={
        name: "",
        email: "",
        password: ""
    };

    //Validation schema
    const validationSchema = yup.object().shape ({
        name: yup.string().required("Enter Name"),
        email: yup.string().required().email("enter email"),
        password: yup.string().required("Enter ur password"),
    });

    //3rd after handle
    const handleSubmit = (values) => {
        console.log("Values :",values);
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
            name="name"
            placeholder="Enter your name"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="name"/>
        </p>

        <Field
            type="text"
            name="email"
            placeholder="Enter your email"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="email"/>
        </p>
        <Field
            type="text"
            name="password"
            placeholder="Enter your password"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="password"/>
        </p>     
        </div>
        <br></br>
        <button type = "submit" className='btn btn-warning'>Register</button>
     </Form>


    </Formik>


    </>
  )
}
export default Signup