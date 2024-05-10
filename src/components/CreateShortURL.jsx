import { useFormik } from 'formik';
import React, { useState } from 'react'
import urlServices from '../services/urlServices';
import { Link } from 'react-router-dom';

function CreateShortURL() {
    const [shortLink,setShortLink] = useState()
    const createUrl = useFormik({
        initialValues: {
          urlLink: "",
        },
        validate: (values) => {
          let error = {};
          if (!values.urlLink) {
            error.urlLink = "Enter Your URL";
          }
          return error
        },
        onSubmit: async (values,{resetForm}) => {
          try{
            values.hostedUrl=location.origin;
            const res = await urlServices.createUrl(values);
            alert(res.data.message)
            setShortLink((`${values.hostedUrl}/${res.data.url._id}`))
            resetForm();
          }catch(error){
            alert(error.message)
          }
        },
      });
      return (
        <form onSubmit={createUrl.handleSubmit}>
          <div className="Container bg-info">
            <div className="bg-white p-3 rounded text- center">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="urlLink"
                  name="urlLink"
                  placeholder="Past here your URL Link"
                  value={createUrl.values.userName}
                  onChange={createUrl.handleChange}
                  style={{
                    borderColor:
                    createUrl.getFieldMeta("urlLink").error &&
                    createUrl.getFieldMeta("urlLink").touched &&
                      "red",
                  }}
                />
              </div>
              <div>Your Shorted URL here : <Link to={shortLink} target='_Blank'>{shortLink}</Link></div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
        </form>
      );
    }

export default CreateShortURL