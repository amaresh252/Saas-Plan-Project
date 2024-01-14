

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../AuthSlice";
import { selectLoggedInUser } from "../AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'; 

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const user = useSelector(selectLoggedInUser);

  function handleusername(e) {
    setUsername(e.target.value);
  }

  function handlepassword(e) {
    setPassword(e.target.value);
  }

  function handlerole(e) {
    setRole(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUserAsync({ username: username, password: password, role: role }));
  }

  return (
    <div className="login-container">
      {user && console.log(user.role)}
      {user && navigate(`/${user.role}`)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">UserName</label>
        <input id="username" type="email" name="username" value={username} onChange={handleusername} autoComplete="username" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" value={password} onChange={handlepassword} autoComplete="current-password" />
        <label htmlFor="role">Role</label>
        <select type="role" id="role" value={role} onChange={handlerole}>
          <option type="select">Select</option>
          <option type="User">User</option>
          <option type="SuperAdmin">SuperAdmin</option>
          <option type="Admin">Admin</option>
        </select>
        <button type="submit">LogIn</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
