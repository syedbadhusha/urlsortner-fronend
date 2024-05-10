import React from 'react'
import { Outlet, useLoaderData, useNavigate } from 'react-router'
import userServices from '../services/userServices';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export async function loader(){
    const user = await userServices.currentUser()
    return {user}
}

function AppNav() {
    const {user} = useLoaderData();
    const navigate = useNavigate()
    const handleLogout = () => {
        // perform user logout
        userServices.logout()
            .then(response => {
                alert(response.data.message);

                // redirect to login page
                setTimeout(() => {
                    navigate("/");
                }, 500);

            })
            .catch(error => {
                alert(error.message);
            });
    }

  return (
    <div className="container-fluid">
    <div className="row">
        <div className="col position-fixed">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <Link className="navbar-brand" to="/appnav/dashboard">Welcome { user.data.firstName }</Link>
              <Link className="nav-link" onClick={handleLogout}>Logout</Link>
        </nav>
        </div>
    </div> 

    <div className="row mt-5">
        <div className="col-md-3">
            <Sidebar />
            </div>
          <div className="col">
              <Outlet />
          </div>
  </div>  
</div>
)
}
export default AppNav