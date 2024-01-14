import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import './Plans.css'; 
import {  deletePlansAsync, fetchAllPlansAsync, selectAllPlans} from "../PlansSlice";
import {Link, useNavigate} from 'react-router-dom';
import { selectLoggedInUser, signoutAsync } from "../../auth/AuthSlice";
export default function Plans() {
  const dispatch = useDispatch();
  const plans = useSelector(selectAllPlans);
  const  navigate =useNavigate();
  const user=useSelector(selectLoggedInUser)
  useEffect(() => {
      dispatch(fetchAllPlansAsync());
  }, [dispatch]);

   function handleDelete(e,_id){
    dispatch(deletePlansAsync(_id));
   }
   const handleUpdate = (e, _id) => {
    if (_id) {
      navigate(`/SuperAdmin/updatePlans/${_id}`);
    }
  };
   const handleAddPlan = () => {
    navigate(`/SuperAdmin/addPlans`)
  };
  const handlenavigate = () => {
    navigate(`/Dashboard`)
  };

   function handlesignout(){
    dispatch(signoutAsync());  
    
      navigate('/')
    
   }
    

  return (
  <>
  
  <div>
    <h1 className="heading"><em>Welcome SuperAdmin</em></h1>
    
  <button className="add-plan-button" onClick={handleAddPlan}>
        Add New Plan
   </button> 
   <span className="button-logout"><button onClick={handlesignout}>LogOut</button></span>
   <span className="button-logout"><button onClick={handlenavigate}>Dashboard</button></span>
  </div>
  {Array.isArray(plans) && plans.length > 0 ? (
    plans.map((plan) => (
      <div key={plan._id} className="plan-item">
        <p>PlanName: {plan.planName}</p>
        <p>Price: INR {plan.price}</p>
        <p>Duration: {plan.duration}</p>
        <p>maxUsers: {plan.maxUsers}</p>
        <p>Features: {plan.features}</p>
        <button onClick={e => handleDelete(e,plan._id)}>Delete</button>
        <button onClick={e => handleUpdate(e,plan._id)}>Update</button>
        {console.log(plan._id)}
      </div>
    ))
  ) : (
    <p>No Plans Found</p>
  )}
</>
  );
}


