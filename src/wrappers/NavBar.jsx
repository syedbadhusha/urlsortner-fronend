import { Link, Outlet} from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Login
        </Link>
        <Link to="/register" className="navbar-brand">
            register
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
