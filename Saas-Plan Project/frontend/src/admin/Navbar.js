import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import './Navbar.css';
import { selectLoggedInUser, signoutAsync } from '../auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({children}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector(selectLoggedInUser)
     function handlesignout(){
            dispatch(signoutAsync({username:user.username,role:user.role}));  
              navigate('/')
            
           }
        
  return (
    <>
     <nav className="navbar">
      <Link to="/Admin" className="nav-link">
        <FaHome />
        Home
      </Link>
      <Link to="/Admin/registration" className="nav-link">
        <FaUserPlus />
        User Registeration Form
      </Link>
      <Link to="/Admin/cart" className="nav-link">
        <FaShoppingCart />
        Cart
      </Link>
      <Link to="/Admin/order" className="nav-link">
        <FaClipboardList />
        Orders
      </Link>
      <Link to="/" className="nav-link">
     <button onClick={handlesignout}> LogOut</button>
      </Link>
    </nav>
    {children}
    </>
   
  );
};

export default Navbar;
