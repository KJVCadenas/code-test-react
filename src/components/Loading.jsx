import React from 'react';
import '../assets/scss/styles.scss'; // Import the CSS file

const Loading = () => {
  return (
    <div className="loading">
      <p>Loading...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;