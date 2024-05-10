import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ListofURL from "./components/ListofURL";
import Dashboard from "./components/Dashboard";
import CreateShortURL from "./components/CreateShortURL";
import NavBar from "./wrappers/NavBar";
import PasswordReset from "./components/PasswordReset";
import Activation from "./components/Activation";
import NewPassword from "./components/NewPassword";
import AppNav from "./wrappers/AppNav";
import { loader as userLoader } from "./wrappers/AppNav";
import Redirect from "./components/Redirect";

const router = createBrowserRouter([
  {
    path:'/',
    element:<NavBar/>,
    children:[
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:"/activation/:userName",
        element:<Activation />
      },
      {
        path:'/passwordreset',
        element:<PasswordReset />
      },
      {
        path:'/newpassword/:userName',
        element:<NewPassword/>
      },
    ]
  },
  {
    path:"appnav",
    element:<AppNav />,
    loader:userLoader,
    children:[
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "create",
        element: <CreateShortURL />,
      },
      {
        path: "urllist",
        element: <ListofURL />,
      },
    ]
  },
  {
    path:":urlid",
    element:<Redirect />
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
