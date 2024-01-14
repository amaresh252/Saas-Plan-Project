import { selectAllPlans,UpdatePlansAsync } from "../PlansSlice";
import { useParams,useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import './UpdatePlans.css'

export default function UpdatePlans(){
    const {_id}=useParams();
    const numberIndex=_id
    const dispatch=useDispatch();
    const Plans=useSelector(selectAllPlans);
    const navigate=useNavigate();
    const PlansToUpdate=Plans.find((item)=>item._id===numberIndex)
    const [planName,setplanName]=useState(PlansToUpdate?PlansToUpdate.planName:'');
    const [price,setPrice]=useState(PlansToUpdate?PlansToUpdate.price:'');
    const [duration,setDuration]=useState(PlansToUpdate?PlansToUpdate.duration:'');
    const [maxUsers,setmaxUsers]=useState(PlansToUpdate?PlansToUpdate.maxUsers:'');
    const [features,setFeatures]=useState(PlansToUpdate?PlansToUpdate.features:'');
  
    function handleplanName(e){
        setplanName(e.target.value);
      }
      function handleprice(e){
          setPrice(e.target.value);
      }
      function handleduration(e){
          setDuration(e.target.value);
      }
         function handlemaxUsers(e){
              setmaxUsers(e.target.value);
          }
          function handleFeatures(e){
            setFeatures(e.target.value);
        }
      function  handleSubmit(e){
          e.preventDefault();
         dispatch(UpdatePlansAsync({_id:numberIndex,planName:planName,price:price,duration:duration,maxUsers:maxUsers,features:features}));
         navigate(`/SuperAdmin`)
      }
      
    return(
<div className="form-container">
<form onSubmit={e=>handleSubmit(e)}>
  <label htmlFor="planName">Plan Name:</label>
  <input
    type="text"
    id="planName"
    name="planName"
    value={planName}
    onChange={handleplanName}
  />

  <label htmlFor="price">Price (INR):</label>
  <input
    type="number"
    id="price"
    name="price"
    value={price}
    onChange={handleprice}
  />

  <label htmlFor="duration">Duration:</label>  
  <input
    type="text"
    id="duration"
    name="duration"
    value={duration}
    onChange={handleduration}
  />

  <label htmlFor="maxUsers">Max Users:</label>
  <input
    type="number"
    id="maxUsers"
    name="maxUsers"
    value={maxUsers}
    onChange={handlemaxUsers}
  />
  <label htmlFor="features">Features:</label>
  <input
    type="text"
    id="features"
    name="maxUsers"
    value={features}
    onChange={handleFeatures}
  />

  <button type="submit">Submit</button>
</form>
</div>
    )
};