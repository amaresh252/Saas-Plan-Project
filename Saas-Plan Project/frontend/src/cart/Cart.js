
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAsync, selectItems, selectCartLoaded, fetchItemsByUserIdAsync } from "./CartSlice";
import { selectLoggedInUser } from "../auth/AuthSlice";
import { Link, Navigate } from "react-router-dom";
import "./Cart.css"; 

export default function Cart() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user._id));
  }, [dispatch, user._id]);

  function handleremove(e, _id) {
    dispatch(removeFromCartAsync(_id));
  }

  return (
    <div className="cart-container">
      {!items.length && cartLoaded  &&<Navigate to="/Admin" replace={true}></Navigate>}
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className="cart-item">
            <p>planName: {item.plans.planName}</p>
            <p>Duration: {item.plans.duration}</p>
            <p>Price:INR {item.plans.price}</p>
            <button onClick={(e) => handleremove(e, item._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No Cart Item</p>
      )}
      <div className="checkout-button">
        <Link to="/Admin/checkout">Go to Checkout</Link>
      </div>
    </div>
  );
}
