
import React, { useState } from 'react';
import './RegistrationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, updateUserAsync } from '../auth/AuthSlice';
import { createUser } from '../auth/AuthAPI';

const RegistrationForm = () => {
  const user=useSelector(selectLoggedInUser)
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'User',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(user && (user.userlimit >=(user.currentusercount+1))){
    
      const val=user.currentusercount+1;
      dispatch(updateUserAsync({...user,currentusercount:val}))
      createUser({username:formData.username,password:formData.password,role:formData.role});
      alert('new user created')
    }
    else {
      alert('already reached maximum number of user limit')
    }
   
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form for User by Admin</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
