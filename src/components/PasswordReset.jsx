import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';
import userServices from '../services/userServices';
function PasswordReset() {
    const navigate = useNavigate()
    const passwordReset = useFormik({
      initialValues: {
        userName: "",
      },
      validate: (values) => {
        let error = {};
        if (!values.userName) {
          error.userName = "Please Enter Mail ID";
        }
        return error
      },
      onSubmit: async (values,{resetForm}) => {
        try{
          values.passwordChangeLink=`https://urlsortner-backend-z4gv.onrender.com/${values.userName}`
          const res = await userServices.passwordReset(values)
          alert(res.data.message)
          resetForm();  
          navigate(`/`)
        }catch(error){
          alert(error.response.data.message)
        }
      },
    });
    return (
      <form onSubmit={passwordReset.handleSubmit}>
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
                value={passwordReset.values.userName}
                onChange={passwordReset.handleChange}
                style={{
                  borderColor:
                  passwordReset.getFieldMeta("userName").error &&
                  passwordReset.getFieldMeta("userName").touched &&
                    "red",
                }}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </form>
    )}

export default PasswordReset