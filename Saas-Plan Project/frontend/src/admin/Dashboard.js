import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {Link, useNavigate} from 'react-router-dom'

import { selectLoggedInUser ,fetchAllUserAsync} from "../auth/AuthSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user=useSelector(selectLoggedInUser)
  const  navigate =useNavigate();
  useEffect(() => {
      dispatch(fetchAllUserAsync());
  }, [dispatch]);
  const handleAddPlan = () => {
    navigate(`/SuperAdmin`)
  };
  return (
  <>
  <div>
  <button className="add-plan-button" onClick={handleAddPlan}>
        Go To Home
   </button>
  </div>
  
   <table className="plan-item">
  <tr>
    <th><p>AdminName</p></th>
    <th><p>PlanName</p></th>
    <th><p>Duration</p></th>
    <th><p>maxUsers</p></th>
  </tr>
  {Array.isArray(user) && user.length > 0 && (
    
    user.map((admin) => (
       
      <tr>
        <th><p>{admin.username}</p></th>
        <th><p>{admin.plan}</p></th>
        <th><p>{admin.duration}</p></th>
        <th><p>{admin.userlimit}</p></th>
      </tr>
      
    ))
  ) }
 {Array.isArray(user) && user.length === 0 && <p>No Plans Found</p> }
  </table>
</>
  );
}



