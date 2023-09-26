import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../components/GlobalContext";

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { currentUserContext } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = currentUserContext;
  const redirect = useNavigate();

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
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      })

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      const user = await res.json();

      setCurrentUser(user);
      redirect('/courses');
    } catch(err) {
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
        <button type="button" onClick={submit}>Login</button>
      </form>
    </div>
  )
}

export default Login;