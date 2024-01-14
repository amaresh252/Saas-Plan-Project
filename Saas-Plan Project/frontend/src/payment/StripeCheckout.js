import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51OYClFSBmB9EfXdGNaprHZIqHR207bpOA62jzYUzF9uvQfbwE3ZNkCo9WqLCDHy8WEHtRxRkTRAjIS9xfcV4ze8D00MCB1DpEh");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
const navigate=useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  const handleAddPlan = () => {
    navigate(`/Admin/order`)
   
  };
  return (<>
   <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
    <div>
    <button className="add-plan-button" onClick={handleAddPlan}>
        Go To Order Page
   </button>
  </div>
   
  </>
   
  );
}