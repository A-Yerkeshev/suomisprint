import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import "../styles/App.css";
import "../styles/Navbar.css";
import Button from "../components/Button";
import GlobalContext from "../components/GlobalContext";
import { useLogout } from '../hooks/useLogout'
import {AuthContext } from '../context/AuthContext.js'

const Layout = () => {
  const { user,role, dispatch } = useContext(AuthContext);
  const { logout } = useLogout()

  const handleClick = () => {
    logout();
    dispatch({ type: 'LOGOUT' });  // Using dispatch from AuthContext
  }

  return (
    <>
      <div className="main-wrapper">
        <nav>
          <div className="nav-logo">SuomiSprint</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/mycourses">My courses</Link>
            </li>
          </ul>
          <div className="two-buttons">
          {
            user ? (
              <>
                {`${user.name}, you are logged in as a ${role}`}
                <Button color="red" text="Logout" onClick={handleClick} />
              </>
           ) : (
                <>
                  <Link to="/register">
                    <Button color="coral" text="Join Us" />
                  </Link>
                  <Link to="/login">
                      <Button color="blue" text="Log in" />
                  </Link>
                </>
  )
}
          </div>
        </nav>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <footer className="footer">SuomiSprint &copy; 2023</footer>
    </>
  );
};

export default Layout;
