import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './Signup.css';
import loginpriview from  "../../assets/loginpreview.png"
//Inittial schema of formik
const Signup = () => {

    const [profilePic, setProfilepic] = useState("")

    const defaultValue ={
        name: "",
        email: "",
        password: "",
        mobile: "",
        city:"",
        state:"",
    };
    //set profile pic
    const addUserpic = (e) => {
        setProfilepic(e.target.files[0])
    } 

    //Validation schema
    const validationSchema = yup.object().shape ({
        name: yup.string().required("Enter Name"),
        email: yup.string().required().email("enter email"),
        password: yup.string().required("Enter ur password"),
        mobile: yup.string().required("Enter ur mobile"),
        city: yup.string().required("Enter ur city"),
        state: yup.string().required("Enter ur state"),
    });

    //3rd after handle
    const handleSubmit = (values) => {
        let userObj ={...values, profilepic: profilePic}
        console.log("User object",userObj);
    };


  return (
    <>
    <div className='welcome'>
        <h1> WELCOME </h1>
        <p>THIS IS A TEST OF MY CSS SKILLS</p>
    </div>

    <div className='leftimage'>
        <img src={loginpriview}></img>
    </div>

    <div className='form'>

    <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
     <Form>
     <h2 className='signup'> Sign Up</h2>
     <p className='signup-details'>Enter your details to sign up</p>
        <div className="col-md-10 mt-4"style={{marginLeft:"30px"}}>
        <Field
            type="text"
            name="name"
            placeholder="Enter your name"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="name"/>
        </p>
        </div>

        <div className="col-md-10 mt-4"style={{marginLeft:"30px"}}>        

        <Field
            type="text"
            name="email"
            placeholder="Enter your email"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="email"/>
        </p>
        </div>
        <div className="col-md-10 mt-4"style={{marginLeft:"30px"}}> 
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
        <div className="col-md-10 mt-4"style={{marginLeft:"30px"}}> 
        <Field
            type="text"
            name="mobile"
            placeholder="Enter your mobile number"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="mobile"/>
        </p>     
        </div>
        <div className="col-md-10 mt-4"style={{marginLeft:"30px"}}> 
        <Field
            type="text"
            name="city"
            placeholder="Enter your City"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="City"/>
        </p>     
        </div>
        <div className="col-md-10 mt-4"style={{marginLeft:"30px"}}> 
        <Field
            type="text"
            name="state"
            placeholder="Enter your State"
            className="form-control"
        />
        <p className='text-danger'>
            <ErrorMessage name="State"/>
        </p>     
        </div>
        <div className="col-md-10 mt-4">
                  <input  type="file" name="profilepic" className='form-control-file' onChange={addUserpic}/>

        </div>
        <br></br>
         
        <button type = "submit" className='signupbutton'>Sign Up</button>
    
     </Form>

    </Formik>
    </div>
    </>
  )
}
export default Signup