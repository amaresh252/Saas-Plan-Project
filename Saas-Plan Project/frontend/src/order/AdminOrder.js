import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrderAsync, selectAllOrder } from './AdminOrderSlice';
import { selectLoggedInUser } from '../auth/AuthSlice';


export default function AdminOrder() {
  const dispatch = useDispatch();
  const  user=useSelector(selectLoggedInUser)
  const orders = useSelector(selectAllOrder);
  

  useEffect(() => {
    dispatch(fetchAllOrderAsync(user._id));
  }, [dispatch]);

  return (
    <div>
    {orders  && orders.map((order) => (
      <div>
        <h1>  Order # {order._id}</h1>
        <h3 > Order Status : {order.status}</h3>
        <p>paymentMethod : {order.paymentMethod}</p>
        <div>Plan Detail</div>
            <div >
            {order.plans.map((item) => (
                
                <ul key={item.plans._id}> 
                    <li  ><p >planName :{item.plans.planName}</p></li>
                    <li  ><p >price :{item.plans.price}</p></li>
                    <li  ><p >duration :{item.plans.duration}</p></li>
                    <li ><p >maxUsers :{item.plans.maxUsers}</p></li>
                </ul>
             ))}
            </div>
            <div>Shipping Address</div>
            <div >
           
                <ul key={order._id}> 
                    <li  ><p >fullName :{order.address.fullname}</p></li>
                    <li ><p >Address1 :{order.address.Address1}</p></li>
                    <li  ><p >Address1 :{order.address.Address2}</p></li>
                    <li  ><p >City :{order.address.City}</p></li>
                    <li  ><p >State :{order.address.State}</p></li>
                    <li  ><p >PinCode :{order.address.PinCode}</p></li>
                </ul>
             
            </div>
            

     </div>))}
    </div>
  );
}