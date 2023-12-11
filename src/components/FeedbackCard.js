import React, { useEffect, useState } from 'react';
import Card from './Card';
import './FeedbackCard.css';

const FeedbackCard = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://feedback-99e46-default-rtdb.firebaseio.com/posts.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Firebase');
        }

        const data = await response.json();

        // Check if data is not null before updating state
        if (data) {
          const feedbackArray = Object.values(data);
          setFeedbackData(feedbackArray);
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        // You can add logic here for handling errors, e.g., showing an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid">
      {feedbackData.map((feedback, index) => (
        <Card key={index} name={feedback.name} message={feedback.message} />
      ))}
    </div>
  );
};

export default FeedbackCard;
