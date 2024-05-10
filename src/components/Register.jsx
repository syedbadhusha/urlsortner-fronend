import { useFormik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';
function Register() {
    const navigate = useNavigate()
    const userRegistration = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
        },
        validate: (values) => {
          let error = {};
          if (!values.firstName) {
            error.firstName = "Please Enter First Name";
          }
          if (!values.lastName) {
            error.lastName = "Please Enter Last Name";
          }
          if (!values.userName) {
            error.userName = "Please Enter Mail ID";
          }
          if (!values.password) {
            error.password = "Please Enter Password";
          }
          return error
        },
        onSubmit: async (values,{resetForm}) => {
          try{
            values.activationLink = `https://luxury-queijadas-04da4f.netlify.app/activation/${values.userName}`
            const res = await userServices.resgister(values)
            alert(res.data.message)
            resetForm();
            navigate('/')
          }catch(error){
            alert(error.response.data.message)
          }
        },
      });
      return (
        <form onSubmit={userRegistration.handleSubmit}>
          <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25 text- center">
              <div className="mb-3">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={userRegistration.values.firstName}
                  onChange={userRegistration.handleChange}
                  style={{
                    borderColor:
                    userRegistration.getFieldMeta("firstName").error &&
                    userRegistration.getFieldMeta("firstName").touched &&
                      "red",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={userRegistration.values.lastName}
                  onChange={userRegistration.handleChange}
                  style={{
                    borderColor:
                    userRegistration.getFieldMeta("lastName").error &&
                    userRegistration.getFieldMeta("lastName").touched &&
                      "red",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userName">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="userName"
                  name="userName"
                  placeholder="EMAIL"
                  value={userRegistration.values.userName}
                  onChange={userRegistration.handleChange}
                  style={{
                    borderColor:
                    userRegistration.getFieldMeta("userName").error &&
                    userRegistration.getFieldMeta("userName").touched &&
                      "red",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="PASSWORD"
                  value={userRegistration.values.password}
                  onChange={userRegistration.handleChange}
                  style={{
                    borderColor:
                    userRegistration.getFieldMeta("password").error &&
                    userRegistration.getFieldMeta("password").touched &&
                      "red",
                  }}
                />
              </div>
              <div><Link to={'/'}>Already Have an Account?</Link></div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }

export default Register