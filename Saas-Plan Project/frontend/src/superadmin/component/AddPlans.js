import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddPlansAsync } from '../PlansSlice';
import { useNavigate } from 'react-router-dom';
import './AddPlans.css';

const AddPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    planName: '',
    price: 0,
    duration: '',
    maxUsers: 0,
    features: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      AddPlansAsync({
        planName: formData.planName,
        price: formData.price,
        duration: formData.duration,
        maxUsers: formData.maxUsers,
        features: formData.features,
      })
    );
    navigate('/SuperAdmin');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="planName">Plan Name:</label>
        <input
          type="text"
          id="planName"
          name="planName"
          value={formData.planName}
          onChange={handleChange}
        />

        <label htmlFor="price">Price (INR):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <label htmlFor="maxUsers">Max Users:</label>
        <input
          type="number"
          id="maxUsers"
          name="maxUsers"
          value={formData.maxUsers}
          onChange={handleChange}
        />
        
        <label htmlFor="features">Features:</label>
        <input
          type="text"
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPlans;
