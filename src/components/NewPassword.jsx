import React from 'react'
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import userServices from '../services/userServices';


function NewPassword() {
  const navigate = useNavigate()
  const {userName} = useParams()
  const newPassword = useFormik({
    initialValues: {
      userName:userName,
      newPassword:"",
      reEnterdPassword:""
    },
    validate: (values) => {
      let error = {};
      if (!values.newPassword) {
        error.newPassword = "Enter New Password";
      }
      if (!values.reEnterdPassword) {
        error.reEnterdPassword = "Re - Enter Password";
      }
      if(values.reEnterdPassword!==values.newPassword){
        error.reEnterdPassword = "Password not matching";
      }
      return error
    },
    onSubmit: async (values,{resetForm}) => {
      try{
        const res = await userServices.newPassword(values)
        alert(res.data.message)
        resetForm();  
        navigate('/')
      }catch(error){
        alert(error.response.data.message)
      }
    },
  });
  return (
    <form onSubmit={newPassword.handleSubmit}>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25 text- center">
          <div className="mb-3">
            <label htmlFor="newPassword">Enter New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="Enter Your New Password"
              value={newPassword.values.newPassword}
              onChange={newPassword.handleChange}
              style={{
                borderColor:
                newPassword.getFieldMeta("newPassword").error &&
                newPassword.getFieldMeta("newPassword").touched &&
                  "red",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reEnterdPassword">Re-Enter New Password</label>
            <input
              type="password"
              className="form-control"
              id="reEnterdPassword"
              name="reEnterdPassword"
              placeholder="Re-Enter Your New Password"
              value={newPassword.values.reEnterdPassword}
              onChange={newPassword.handleChange}
              style={{
                borderColor:
                newPassword.getFieldMeta("reEnterdPassword").error &&
                newPassword.getFieldMeta("reEnterdPassword").touched &&
                  "red",
              }}
            />
          </div>
          <div style={{color:"red"}}>{newPassword.getFieldMeta("reEnterdPassword").error}</div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewPassword