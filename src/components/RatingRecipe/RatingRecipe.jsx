/**
 * @Author Ayush Amrishbhai Patel
 * @BannerId B00855591
 * 
 * * References:
 *   1. Author: Javascript development team
 *      Line of code: 31-41, 46-57
 *      URL: https://jsdev.space/nextjs-rating/
 *      Date Accessed: 25 March 2024
 *      Reason for Usage: Used the website to learn about how to implement the ratings feature in next js project.
 * 
 * @author Jenna Cogswell - added stop event propogation
 */

import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const StarRating = ({ totalStars, initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating);
    if (onRate) {
      onRate(newRating);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          selected={index < (hoverRating || rating)}
          onClick={(e) => {
            e.stopPropagation();
            handleStarClick(index + 1)}}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const Star = ({ selected, onClick, onMouseEnter, onMouseLeave }) => (
    <FaHeart
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ 
      color: selected ? 'red' : 'black', 
      cursor: 'pointer',
      marginRight: '5px',
    }}
  />
);

export default StarRating;
