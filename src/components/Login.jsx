import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import userServices from '../services/userServices';

function Login() {
    const navigate = useNavigate()
    const userLogin = useFormik({
        initialValues: {
          userName: "",
          password: "",
        },
        validate: (values) => {
          let error = {};
          if (!values.userName) {
            error.userName = "Please Enter Mail ID";
          }
          if (!values.password) {
            error.password = "Please Enter Password";
          }
          return error
        },
        onSubmit: async (values) => {
          try{
            await userServices.login(values)
            navigate('/appnav/dashboard');
          }catch(error){
            alert(error.message)
          }
        },
      });
      return (
        <form onSubmit={userLogin.handleSubmit}>
          <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25 text- center">
              <div className="mb-3">
                <label htmlFor="userName">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="userName"
                  name="userName"
                  placeholder="EMAIL"
                  value={userLogin.values.userName}
                  onChange={userLogin.handleChange}
                  style={{
                    borderColor:
                    userLogin.getFieldMeta("userName").error &&
                    userLogin.getFieldMeta("userName").touched &&
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
                  value={userLogin.values.password}
                  onChange={userLogin.handleChange}
                  style={{
                    borderColor:
                    userLogin.getFieldMeta("password").error &&
                    userLogin.getFieldMeta("password").touched &&
                      "red",
                  }}
                />
              </div>
              <div><Link to={'/passwordreset'}>Forgot Password?</Link></div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }

export default Login