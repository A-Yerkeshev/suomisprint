import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../components/GlobalContext";

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 0
  });
  const [repPassword, setRepPassword] = useState('');
  const { currentUserContext } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = currentUserContext;
  const redirect = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  const submit = async (event) => {
    event.preventDefault();

    // Verify that password and repeat password match
    if (user.password !== repPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Register new user
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      const newUser = await res.json();

      setCurrentUser(newUser);
      redirect('/courses');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="name">Username:</label>
          <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input
              type="email"
              id="email"
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
              required
            />
        </div>
        <div>
          <label htmlFor="password-rep">Repeat password:</label>
          <input
              type="password"
              id="password-rep"
              name="password-rep"
              value={repPassword}
              onChange={(e) => setRepPassword(e.target.value)}
              required
            />
        </div>
        <button type="button" onClick={submit}>Register</button>
      </form>
    </div>
  )
}

export default Register