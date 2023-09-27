import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import "../styles/App.css";
import "../styles/Navbar.css";
import Button from "../components/Button";
import GlobalContext from "../components/GlobalContext";
import { useLogout } from '../hooks/useLogout'

const Layout = () => {
  const { currentUserContext } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = currentUserContext;
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
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
              <Link to="/teacher">For teachers</Link>
            </li>
          </ul>
          <div className="two-buttons">
          {
            currentUser ? (
              <>
                {`Logged in as ${currentUser.name}`}
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
