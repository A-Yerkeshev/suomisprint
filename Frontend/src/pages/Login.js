import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ROLE } from "../context/AuthContext.js";
import { useLogin } from "../hooks/useLogin";
import "../styles/Register.css";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login, isLoading, error } = useLogin();
  const { user, role, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Role changed:", role);
  }, [role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submit = async (event) => {
    console.log("Submit function triggered");
    event.preventDefault();
    try {
      const userData = await login(credentials.email, credentials.password);
      if (userData) {
        // Convert role to readable form
        userData.role = userData.role === 0 ? ROLE.CUSTOMER : ROLE.TEACHER;
        console.log("Transformed role:", userData.role);

        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Update AuthContext
        dispatch({ type: "LOGIN", payload: userData });
        dispatch({ type: "SET_ROLE", payload: userData.role });

        // Navigate based on role
        if (userData.role === ROLE.CUSTOMER) {
          navigate("/courses");
        } else if (userData.role === ROLE.TEACHER) {
          navigate("/");
        } else {
          navigate("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-table">
      <h1 className="register-heading">Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="register-button"
          type="button"
          onClick={submit}
          disabled={isLoading}
        >
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
