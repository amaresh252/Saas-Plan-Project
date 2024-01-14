import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import './Home.css'; 
import { fetchAllPlansAsync, selectAllPlans } from "../superadmin/PlansSlice";

import {Link, useNavigate} from 'react-router-dom'

import { addToCartAsync, fetchItemsByUserIdAsync, selectItems } from "../cart/CartSlice";
import { selectLoggedInUser } from "../auth/AuthSlice";

export default function Home() {
  const dispatch = useDispatch();
  const plans = useSelector(selectAllPlans);
  const items=useSelector(selectItems)
  const  navigate =useNavigate();
  useEffect(() => {
      dispatch(fetchAllPlansAsync());
  }, [dispatch]);
  const user=useSelector(selectLoggedInUser)
    function handleAddToCart(e,_id) {
      const planid=items.find(item=>item.plans._id===_id)
      
      if(!planid){
        dispatch(addToCartAsync ({ plans:_id, Admin:user._id }))
        alert('Added To Cart') 
      }else {
        alert('Already Added') 
      }
      
    }



  return (
  <>
  {Array.isArray(plans) && plans.length > 0 ? (
    plans.map((plan) => (
      <div key={plan._id} className="plan-item">
        <p>PlanName: {plan.planName}</p>
        <p>Price: ${plan.price}</p>
        <p>Duration: {plan.duration}</p>
        <p>maxUsers: {plan.maxUsers}</p>
        <p>Features: {plan.features}</p>
        <button onClick={e => handleAddToCart(e,plan._id)}>add To Cart</button>
        {console.log(user)}
      </div>
    ))
  ) : (
    <p>No Plans Found</p>
  )}
  
</>
  );
}


