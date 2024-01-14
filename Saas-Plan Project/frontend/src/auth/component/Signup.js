
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../AuthSlice";
import { selectLoggedInUser } from "../AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; 

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  function handleusername(e) {
    setUsername(e.target.value);
  }

  function handlepassword(e) {
    setPassword(e.target.value);
  }

  function handleconfirmpassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handlerole(e) {
    setRole(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUserAsync({ username: username, password: password, role: role }));
  }

  return (
    <div className="signup-container">
      {user && navigate(`/${user.role}`)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">UserName</label>
        <input id="username" type="email" name="username" value={username} onChange={handleusername}></input>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" value={password} onChange={handlepassword}></input>
        <label htmlFor="confirmpassword">Confirm-Password</label>
        <input id="confirmpassword" type="password" name="confirmpassword" value={confirmpassword} onChange={handleconfirmpassword}></input>
        <label htmlFor="role">Role</label>
        <select type="role" id="role" value={role} onChange={handlerole}>
          <option type="select">Select</option>
          <option type="SuperAdmin">SuperAdmin</option>
          <option type="Admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <p className="link-text">
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
  );
}
