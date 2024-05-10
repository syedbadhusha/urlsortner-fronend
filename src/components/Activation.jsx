import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import userServices from '../services/userServices'

function Activation() {
    const navigate = useNavigate()
    const userName = useParams()
    const activationFormik = useFormik({
        initialValues:{
            userName:userName
        },
        onSubmit:async(values) => {
            try{
                const res = await userServices.activation(values)
                alert(res.data.message)
                navigate('/')
            }catch(error){
                alert(error.response.data.message)
            }
        }
    })
  return (
    <form onSubmit={activationFormik.handleSubmit}>
    <div className="text-center">
    <button type="submit" className="btn btn-primary">
      Activate
    </button>
  </div>
  </form>
  )
}

export default Activation