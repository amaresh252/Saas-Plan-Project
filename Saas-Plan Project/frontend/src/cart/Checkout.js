import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, updateUserAsync } from "../auth/AuthSlice";
import { selectCartLoaded, selectItems } from "./CartSlice";
import "./Checkout.css";
import { placeOrderAsync, selectCurrentOrder } from "../order/AdminOrderSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const CurrentOrder = useSelector(selectCurrentOrder);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    PinCode: "",
  });
  const [currentAddress, setCurrentAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  function handlechange(e) {
    const { id, value } = e.target;
    setAddress((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, address] }));
  }

  function handleAddress(e) {
    if (user) {
      setCurrentAddress(user.addresses[e.target.value]);
    }
  }

  function handlepayment(e) {
    setPaymentMethod(e.target.value);
  }

  function handleOrder() {
    if (currentAddress && paymentMethod && items.length > 0) {
      dispatch(
        placeOrderAsync({
          plans: items,
          address: currentAddress,
          paymentMethod: paymentMethod,
          adminid: user._id,
          status: "pending",
        })
      )
      dispatch(updateUserAsync({ ...user, userlimit: items[0].plans.maxUsers,planName:items[0].plans.planName,duration:items[0].plans.duration}))
    } else {
      alert("Enter Address, Payment Method, and ensure items are in the cart");
    }
  }

 

  return (
    <>
      {CurrentOrder && paymentMethod === "Cash" && navigate("./Admin/order")}
      {CurrentOrder && paymentMethod === "Card" && navigate("./Admin/payment")}
      {!items.length && cartLoaded && <Navigate to="/Admin" replace={true}></Navigate>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Name</label>
        <input id="fullName" type="text" value={address.fullName} onChange={handlechange} />
        <label htmlFor="Address1">Address1</label>
        <input id="Address1" type="text" value={address.Address1} onChange={handlechange} />
        <label htmlFor="Address2">Address2</label>
        <input id="Address2" type="text" value={address.Address2} onChange={handlechange} />
        <label htmlFor="City">City</label>
        <input id="City" type="text" value={address.City} onChange={handlechange} />
        <label htmlFor="State"> State</label>
        <input id="State" type="text" value={address.State} onChange={handlechange} />
        <label htmlFor="PinCode">Pincode</label>
        <input id="PinCode" type="text" value={address.PinCode} onChange={handlechange} />
        <button type="submit">Submit</button>
      </form>

      <div>Select Address</div>
      {user &&
        user.addresses.map((address, index) => (
          <fieldset key={index}>
            <input id={`address-${index}`} name="address" type="radio" value={index} onChange={handleAddress} />
            <label htmlFor={`address-${index}`}>
              <em>
                <span>fullName: {address.fullName}</span> <span>Address1: {address.Address1}</span>
              </em>
              <em>
                <span>Address2: {address.Address2}</span> <span>City :{address.City}</span>
              </em>
              <em>
                <span>State :{address.State}</span> <span>Pincode :{address.PinCode}</span>
              </em>
            </label>
          </fieldset>
        ))}

      <fieldset>
        <div>Select paymentMethod</div>
        <label htmlFor="Cash">Cash</label>
        <input id="Cash" name="paymentmethod" type="radio" value="Cash" checked={paymentMethod === "Cash"} onChange={handlepayment} />
        <label htmlFor="Card">Card</label>
        <input id="Card" name="paymentmethod" type="radio" value="Card" checked={paymentMethod === "Card"} onChange={handlepayment} />
      </fieldset>
      <div>
        <p>Total Price: {items.length > 0 ? items[0].plans.price : 0}</p>
      </div>
      <button type="button" onClick={handleOrder}>
        Place Order
      </button>
    </>
  );
}
