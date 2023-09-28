import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ROLE } from "../context/AuthContext.js";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
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
      console.log("Received userData:", userData);
    if (userData) {
      // Store the converted role in userData
      userData.role = userData.role === 0 ? ROLE.CUSTOMER : ROLE.TEACHER;
      console.log("Transformed role:", userData.role); 
      
      // Update the role in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      dispatch({ type: 'LOGIN', payload: userData });
      dispatch({ type: 'SET_ROLE', payload: userData.role });

      console.log("Role from Constant:", ROLE.CUSTOMER, ROLE.TEACHER);

        if (userData.role === ROLE.CUSTOMER) {
          console.log("Navigating to /courses");
          navigate('/courses');
        }else if (userData.role === ROLE.TEACHER) {
          navigate('/');
        }
        else {
          console.log("Navigating to /home");
          navigate('/register');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="button" onClick={submit} disabled={isLoading}>
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;