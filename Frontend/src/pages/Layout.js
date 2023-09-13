import { Outlet, Link } from "react-router-dom";
import "../styles/App.css";

const Layout = () => {
  return (
    <>
   <nav>
  <div className="nav-logo">SuomiSprint</div>
  <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
  <div>
    <button className="nav-button">Login</button>
    <button className="nav-button nav-button-join coral-button">Join Us</button>
  </div>
</nav>

      <main className="page-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
