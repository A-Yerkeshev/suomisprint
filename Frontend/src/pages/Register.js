import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from '../hooks/useRegister';
import { useLogin } from '../hooks/useLogin';
import "../styles/Register.css";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: 0,
  });
  const [repPassword, setRepPassword] = useState("");
  const redirect = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const { register, isLoading, error } = useRegister();
  const { login } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    // Verify that password and repeat password match
    if (user.password !== repPassword) {
      alert("Passwords do not match!");
      return;
    }

    await register(user);
    if (error) {
      console.log("Error exists: ", error); // Debug line to ensure error exists.
      return (
        <div className="error">
          {error}
        </div>
      );
    }

    login(user.email, user.password); // Assuming the 'user' object now includes the server response
    redirect("/courses");

  };

  return (
    <div className="register-table">
      <h1 className="register-heading">Register</h1>
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
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
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
        <div>
          <input
            type="checkbox"
            id="role"
            name="role"
            value="role"
            onChange={(e) => {
              setIsChecked(e.target.checked);
              setUser({ ...user, role: e.target.checked ? 1 : 0 });
            }}
            checked={isChecked}
          />
          <label htmlFor="role">I want to publish my courses</label>
        </div>
        <button disabled={isLoading} className="register-button" type="button" onClick={submit}>
          Register
        </button>
        {error&&<div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Register;
