import React from 'react';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, signoutAsync } from '../auth/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const dispatch=useDispatch();
 const user=useSelector(selectLoggedInUser)
 const navigate=useNavigate();
  function handlesignout(){
    dispatch(signoutAsync({username:user.username,role:user.role}));  
      navigate('/')
    
   }
  return (
  <>
  <div><Link to="/" className="nav-link">
     <button onClick={handlesignout}> LogOut</button>
      </Link></div>
    <div className="landing-page-container">
      <h1>Welcome to Our Landing Page</h1>
      <p className="sub-heading">It's currently not working</p>
    </div>
  </>
  
  );
};

export default LandingPage;
