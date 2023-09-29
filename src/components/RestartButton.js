import React from 'react';
import './RestartButton.css'

const RestartButton = ({ onClick }) => {
  return (
    <div>
      {/* Render a button with an onClick event handler */}
      <button className="restart-button" onClick={onClick}>Restart Game</button>
    </div>
  );
};

export default RestartButton;
