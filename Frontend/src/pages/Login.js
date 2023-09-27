import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../components/GlobalContext";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { login, isLoading, error } = useLogin();
  const { currentUserContext } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = currentUserContext;
  //const redirect = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  const submit = async (event) => {
    event.preventDefault();

    try {
      await login(credentials.email, credentials.password); // Use login from useLogin
      if (!error) {
       // redirect('/courses');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">email:</label>
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
          <label htmlFor="password">password:</label>
          <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
        </div>
        <button type="button" onClick={submit} disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login;