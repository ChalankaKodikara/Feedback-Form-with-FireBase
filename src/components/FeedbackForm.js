import React, { useState } from 'react';
import axios from 'axios';

import './Input.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://feedback-99e46-default-rtdb.firebaseio.com/posts.json',
        formData
      );

      console.log('Data successfully sent to Firebase:', response.data);

      // Set submit success message and clear form data
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset success message after a delay (e.g., 5 seconds)
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending data to Firebase:', error);
      // You can add logic here for handling errors, e.g., showing an error message
    }
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      {submitSuccess && (
        <p className="success-message">Form submitted successfully!</p>
      )}
      <form className="colorful-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            required
            placeholder="Enter your name"
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            required
            placeholder="Enter your email"
            className="form-input"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Message:
          </label>
          <textarea
            required
            placeholder="Enter your message"
            className="form-input"
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
