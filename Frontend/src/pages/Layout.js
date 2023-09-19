import { Outlet, Link } from "react-router-dom";
import "../styles/App.css";
import "../styles/Navbar.css";
import Button from "../components/Button";

const Layout = () => {
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
            <Button color="coral" text="Join Us" />
            <Button color="blue" text="Log in" />
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
